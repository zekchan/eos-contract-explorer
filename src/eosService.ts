import Eos from "eosjs-api"

const eos = Eos({
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    httpEndpoint: 'https://node1.eosphere.io',
})

export default eos 