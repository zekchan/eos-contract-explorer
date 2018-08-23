import { createAction, createReducer } from 'redux-act';
export interface IAccountsState {
    readonly account: string;
}
const initialState: IAccountsState = {
    account: 'eosio',
}

export const setAccountName = createAction<string>('Set Account name')

export default createReducer<IAccountsState>({}, initialState)
    .on(setAccountName, (state, account) => ({
        ...state,
        account,
    }))