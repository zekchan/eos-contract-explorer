import { createAction, createReducer } from 'redux-act';
import { IIdentity } from '../../Scatter';
type MayBeIdentity = IIdentity | null;
export interface IAccountsState {
    readonly account: MayBeIdentity;
    readonly scatterAvailable: boolean;
}
const initialState: IAccountsState = {
    account: null,
    scatterAvailable: false,
}

export const setIdentity = createAction<MayBeIdentity>('Set Scatter Identity')
export const setScatterAvailable = createAction<boolean>('Set Scatter Available')

export default createReducer<IAccountsState>({}, initialState)
    .on(setIdentity, (state, account: IIdentity) => ({
        ...state,
        account,
    }))
    .on(setScatterAvailable, (state: IAccountsState, scatterAvailable) => ({
        ...state,
        scatterAvailable,
    }))