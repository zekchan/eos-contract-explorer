/*import LinearProgress from '@material-ui/core/LinearProgress';

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
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField'
import { table_def } from 'eosjs-api';
import * as React from "react"
import { connect } from 'react-redux';
import { IState } from '../../state/reducers';
import { tablesSelector } from '../../state/reducers/Contract';
import ContractTable from '../ContractTable';

interface ICState {
    scope: string;
}
interface IStateToProps {
    account: string | null;
    contract: string;
    tables: table_def[];
}
interface IDispatchToProps {
    setScope(scope: string): void;
}
class Tables extends React.Component<IStateToProps & IDispatchToProps, ICState> {
    public state = {
        scope: this.props.contract,
    }
    public render() {
        return <React.Fragment>
            <Card>
                <CardContent>
                    <TextField
                        placeholder='eosio'
                        label='Scope'
                        value={this.state.scope}
                        onChange={this.handleScopeChange}
                    />
                    <Button onClick={this.handleContractNameClick}>{this.props.contract}</Button>
                    {this.props.account && <Button onClick={this.handleAccountNameClick}>{this.props.account}</Button>}
                    <br />
                    { this.props.tables.map(table => (
                        <ContractTable key={table.name} tableName={table.name} />
                    ))}
                </CardContent>
            </Card>
        </React.Fragment>
    }

    private handleScopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setScope(e.target.value)
    }
    private setScope = (scope: string) => {
        this.setState({
            scope,
        })
    }
    private handleContractNameClick = () => {
        this.setScope(this.props.contract)
    }
    private handleAccountNameClick = () => {
        if (this.props.account) {
            this.setScope(this.props.account)
        }
    }
}
const mapStateToProps = (state: IState): IStateToProps => ({
    tables: tablesSelector(state),
    contract: state.contract.account,
    account: state.account.account && state.account.account.accounts[0].name,
})


export default connect(mapStateToProps)(Tables)