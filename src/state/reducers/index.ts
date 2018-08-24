import { combineReducers } from 'redux'
import account, { IAccountsState } from './Account'
import contract, { IContactsState } from './Contract'
import network, { INetworksState } from './Network'
import tables, { ITablesState } from './Tables';

export interface IState {
    tables: ITablesState,
    account: IAccountsState,
    contract: IContactsState,
    network: INetworksState,
}
export default combineReducers<IState>({
    tables,
    account,
    contract,
    network,
})
