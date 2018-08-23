import { createAction, createReducer } from 'redux-act';
interface IState {
    readonly account: string;
}
const initialState: IState = {
    account: 'eosio',
}

export const setContractAccount = createAction<string>('Set Contract account')
export const resetAccountData = createAction('reset Account data')

export default createReducer<IState>({}, initialState)
    .on(setContractAccount, (state, account) => ({
        ...state,
        account,
    }))