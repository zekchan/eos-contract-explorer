import * as React from "react"


const ContractLoader: React.StatelessComponent<{ contractName: string }> = (props: { contractName: string }) => {
    return (
        <div>Загружается ABI для контракта: <b>{props.contractName}</b></div>
    )
}
export default ContractLoader