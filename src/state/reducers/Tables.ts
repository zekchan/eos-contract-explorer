import { table_def } from 'eosjs-api';
import { Dispatch } from 'redux';
import { createAction, createReducer } from 'redux-act';
import { IState } from '.';
import eosService from '../../eosService';
import { contractLoaded, setContractScope } from './Contract';

export interface IRow {
    [fieldName: string]: string;
}
export interface ITable {
    readonly loading: boolean;
    readonly more: boolean;
    readonly key: string;
    readonly rows: IRow[];
}
export interface ITablesState {
    readonly [tableName: string]: ITable
}
const initialState: ITablesState = {}
const getLastKey = (table: ITable): string | void => {
    if (!table.rows.length || !table.key) {
        return
    }

    const lastRow = table.rows[table.rows.length - 1]
    return lastRow[table.key]
}
const loadedMoreRows = createAction<{ tableName: string, rows: IRow[], more: boolean }>('Loaded more rows')
const setTableLoading = createAction<string>('Table loading')
export const loadMoreRows = (limit: number, tableName: string) => (dispatch: Dispatch, getState: () => IState) => {
    const state = getState()
    const table = state.tables[tableName]
    const lowerBound = getLastKey(table)
    dispatch(setTableLoading(tableName))
    return eosService(state).getTableRows(
        true,
        state.contract.account,
        state.contract.scope,
        tableName,
        table.key,
        lowerBound,
        undefined,
        limit + 1, // 1 more becouse first row we already have as last
    )
        .then((result) => {
            const more = result.more
            let rows
            if (table.rows.length) {
                [, ...rows] = result.rows // drop first
            } else {
                rows = result.rows
            }

            dispatch(loadedMoreRows({ tableName, more, rows }))
        })
}
export default createReducer<ITablesState>({}, initialState)
    .on(setContractScope, (state) => Object.keys(state).reduce((acc, tableName) => ({
        ...acc,
        [tableName]: {
            ...state[tableName],
            loading: false,
            more: true,
            rows: [],
        }
    }), {}))
    .on(contractLoaded, (state, abi) => abi.tables.reduce((acc, table: table_def) => ({
        ...acc,
        [table.name]: {
            loading: false,
            more: true,
            key: table.key_names[0],
            rows: [],
        }
    }), {}))
    .on(setTableLoading, (state, tableName) => ({
        ...state,
        [tableName]: {
            ...state[tableName],
            loading: true,
        }
    }))
    .on(loadedMoreRows, (state, data: { tableName: string, more: boolean, rows: IRow[] }) => ({
        ...state,
        [data.tableName]: {
            ...state[data.tableName],
            loading: false,
            more: data.more,
            rows: [
                ...state[data.tableName].rows,
                ...data.rows
            ],
        }
    }))
