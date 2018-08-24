import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField'
import { table_def } from 'eosjs-api';
import * as React from "react"
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../../state/reducers';
import { setContractScope, tablesSelector } from '../../state/reducers/Contract';
import ContractTable from '../ContractTable';

interface ICState {
    scope: string;
}
interface IStateToProps {
    scope: string | null;
    account: string | null;
    contract: string;
    tables: table_def[];
}
interface IDispatchToProps {
    setContractScope(scope: string): void;
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
                    <Button onClick={this.handleSetScopeClick} color="primary">Set Scope</Button>
                    <br />

                    {this.props.scope ? this.props.tables.map(table => (
                        <ContractTable key={table.name} tableName={table.name} />
                    )) : null}
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
    private handleSetScopeClick = () => {
        this.props.setContractScope(this.state.scope)
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
    scope: state.contract.scope,
    account: state.account.account && state.account.account.accounts[0].name,
})
const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => bindActionCreators({ setContractScope }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tables)