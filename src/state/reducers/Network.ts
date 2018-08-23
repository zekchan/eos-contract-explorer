import { createAction, createReducer } from 'redux-act';
export interface INetworksState {
    readonly node: string;
    readonly availebleNodes: string[];
}
const nodes = [
    'https://api.franceos.fr:443',
    'https://api.eosn.io:443',
    'https://api.eosnewyork.io:443',
    'https://api.eosdetroit.io:443',
    'https://eos.greymass.com:443'
]
const initialState: INetworksState = {
    node: nodes[0],
    availebleNodes: nodes,
}

export const setNode = createAction<string>('Set nodeos node')

export default createReducer<INetworksState>({}, initialState)
    .on(setNode, (state, node) => ({
        ...state,
        node,
    }))