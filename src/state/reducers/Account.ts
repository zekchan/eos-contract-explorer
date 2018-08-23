import { createAction, createReducer } from 'redux-act';
interface IState {
    readonly account: string;
}
const initialState: IState = {
    account: 'eosio',
}

export const setAccountName = createAction<string>('Set Account name')

export default createReducer<IState>({}, initialState)
    .on(setAccountName, (state, account) => ({
        ...state,
        account,
    }))