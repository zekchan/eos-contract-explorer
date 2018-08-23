import { combineReducers } from 'redux'
import account from './Account'
import contract from './Contract'

export default combineReducers({
    account,
    contract,
})