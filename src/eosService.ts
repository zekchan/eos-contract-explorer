import Eos from "eosjs-api"

const eos = Eos({
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    httpEndpoint: 'http://bp.cryptolions.io:8888',
})

export default eos