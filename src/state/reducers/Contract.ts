import { abi_def } from 'eosjs-api';
import { Dispatch } from 'redux';
import { batch, createAction, createReducer } from 'redux-act';
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