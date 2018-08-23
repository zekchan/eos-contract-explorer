import AppBar from '@material-ui/core/AppBar';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { abi_def, getAbiResult } from "eosjs-api";
import * as React from "react"
import eos from "../eosService"
import ContractTable from "./ContractTable";
import RicardianText from './RicardianText';

interface IProps {
    contractName: string,
    scopeName: string,
}
interface IState {
    loading: boolean,
    abi: abi_def | null,
    error: string | null,
    tab: 0 | 1 | 2,
}
export default class ContractInfo extends React.Component<IProps, IState> {
    public state: IState = {
        loading: true,
        abi: null,
        error: null,
        tab: 0
    }

    public componentDidMount() {
        eos.getAbi(this.props.contractName)
            .then(({ abi }: getAbiResult) => {
                // tslint:disable-next-line:no-console
                console.log(abi)
                this.setState({
                    loading: false,
                    abi,
                })
            })
    }

    public render() {
        if (this.state.loading) {
            return <LinearProgress />
        }
        const { ricardian_clauses, tables, actions, structs } = this.state.abi as abi_def
        const structsMap = structs.reduce((acc, struct) => Object.assign(acc, { [struct.name]: struct }), {})
        return <React.Fragment>
            <AppBar position="static">
                <Tabs value={this.state.tab} onChange={this.handleTab}>
                    <Tab label="Tables" />
                    <Tab label="Ricardian Clauses" />
                    <Tab label="Actions" />
                </Tabs>
            </AppBar>
            {this.state.tab === 0 && tables && tables.map(
                table =>
                    <ContractTable
                        scopeName={this.props.scopeName}
                        key={table.name}
                        contractName={this.props.contractName}
                        table={table}
                        structs={structsMap}
                    />
            )}
            {
                this.state.tab === 1 && ricardian_clauses
                    .sort(({ body }) => body.length ? -1 : 1)
                    .map(({ id, body }) =>
                        <RicardianText name={id} body={body} key={id} />
                    )
            }
            {
                this.state.tab === 2 && actions
                    .sort(({ ricardian_contract }) => ricardian_contract.length ? -1 : 1)
                    .map(({ name, ricardian_contract }) =>
                        <RicardianText name={name} body={ricardian_contract} key={name} />
                    )
            }
        </React.Fragment>
    }
    private handleTab = (e: React.MouseEvent, tab: 0 | 1 | 2) => {
        this.setState({ tab })
    }
}