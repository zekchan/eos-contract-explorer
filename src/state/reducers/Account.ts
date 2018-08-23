import { createAction, createReducer } from 'redux-act';
export interface IAccountsState {
    readonly account: string;
    readonly scatterAvailable: boolean;
}
const initialState: IAccountsState = {
    account: '',
    scatterAvailable: false,
}

export const setAccountName = createAction<string>('Set Account name')
export const setScatterAvailable = createAction<boolean>('Set Scatter Available')

export default createReducer<IAccountsState>({}, initialState)
    .on(setAccountName, (state, account) => ({
        ...state,
        account,
    }))
    .on(setScatterAvailable, (state: IAccountsState, scatterAvailable) => ({
        ...state,
        scatterAvailable,
    }))