import { abi_def, table_def, Tstruct } from 'eosjs-api';
import { Dispatch } from 'redux';
import { batch, createAction, createReducer } from 'redux-act';
import { createSelector } from 'reselect'
import { IState } from '.';
import eosService from '../../eosService';
export interface IContactsState {
    readonly account: string;
    readonly scope: string;
    readonly loading: boolean;
    readonly abi: abi_def | null;
}
const initialState: IContactsState = {
    account: '',
    scope: '',
    loading: false,
    abi: null,
}

export const setContractAccount = createAction<string>('Set Contract account')
export const setContractScope = createAction<string>('Set Contract scope')
export const contractLoading = createAction('Contract loading')
export const contractLoaded = createAction<abi_def>('Contract loaded')
export const resetAccountData = createAction('reset Account data')
export const loadContract = (contractName: string) => (dispatch: Dispatch, getState: () => IState) => {
    dispatch(batch(setContractAccount(contractName), contractLoading()))
    return eosService(getState())
        .getAbi(contractName)
        .then(({ abi }) => {
            dispatch(contractLoaded(abi))
        })
}
export default createReducer<IContactsState>({}, initialState)
    .on(setContractAccount, (state, account) => ({
        ...state,
        account,
    }))
    .on(contractLoading, (state) => ({
        ...state,
        abi: null,
        loading: true,
    }))
    .on(contractLoaded, (state, abi: abi_def) => ({
        ...state,
        abi,
        loading: false,
    }))
    .on(setContractScope, (state, scope: string) => ({
        ...state,
        scope,
    }))

const emptyArray: Tstruct[] = []
export const structuresSelector = (state: IState): Tstruct[] => state.contract.abi ? state.contract.abi.structs : emptyArray
export interface IStructuresMap {
    [structureName: string]: Tstruct,
}
export const structuresMapSelector = createSelector<IState, Tstruct[], IStructuresMap>(
    structuresSelector,
    (structs: Tstruct[]) => structs.reduce((acc, struct) => ({
        ...acc,
        [struct.name]: struct,
    }), {}))
interface ITablesFields {
    [tableName: string]: string[],
}
const emptyTables: table_def[] = []
export const tablesSelector = (state: IState): table_def[] => state.contract.abi ? state.contract.abi.tables : emptyTables
export const tablesFieldsSelector = createSelector(
    structuresMapSelector,
    tablesSelector,
    (structures: IStructuresMap, tables: table_def[]): ITablesFields => (
        tables.reduce((acc, table) => ({
            ...acc,
            [table.name]: structures[table.name].fields.map(({ name }) => name)
        }), {})
    )
)