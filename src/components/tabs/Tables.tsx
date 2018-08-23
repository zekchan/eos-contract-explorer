/*import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from "react"
import ContractTable from "../ContractTable";
import { abi_def } from 'eosjs-api';

interface IProps {
    tables: abi_def['tables']
}

export default class ContractInfo extends React.Component<IProps, IState> {
    public render() {
        const { ricardian_clauses, tables, actions, structs } = this.state.abi as abi_def
        const structsMap = structs.reduce((acc, struct) => Object.assign(acc, { [struct.name]: struct }), {})
        return tables.map(
                table =>
                    <ContractTable
                        scopeName={this.props.scopeName}
                        key={table.name}
                        contractName={this.props.contractName}
                        table={table}
                        structs={structsMap}
                    />
            )}
    }
}
*/