import { combineReducers } from 'redux'
import account, { IAccountsState } from './Account'
import contract, { IContactsState } from './Contract'
import network, { INetworksState } from './Network'

export interface IState {
    account: IAccountsState,
    contract: IContactsState,
    network: INetworksState,
}
export default combineReducers<IState>({
    account,
    contract,
    network,
})
