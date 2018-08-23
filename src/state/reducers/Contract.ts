import { createAction, createReducer } from 'redux-act';
export interface IContactsState {
    readonly account: string;
}
const initialState: IContactsState = {
    account: 'eosio',
}

export const setContractAccount = createAction<string>('Set Contract account')
export const resetAccountData = createAction('reset Account data')

export default createReducer<IContactsState>({}, initialState)
    .on(setContractAccount, (state, account) => ({
        ...state,
        account,
    }))