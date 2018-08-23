import Eos from "eosjs-api"
import { IState } from "./state/reducers";

const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' // MAINNET
export default (state: IState) => Eos({
    chainId,
    httpEndpoint: state.network.node,
})
