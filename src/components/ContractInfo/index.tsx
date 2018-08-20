import { abi_def, getAbiResult } from "eosjs-api";
import * as React from "react"
import eos from "../../eosService"
import ContractLoader from "../ContractLoader";
import MDSwitcher from "../MDSwitcher";
import ContractTable from "../Table";

interface IProps {
    contractName: string,
}
interface IState {
    loading: boolean,
    abi: abi_def | null,
    error: string | null,
}
export default class ContractInfo extends React.Component<IProps, IState> {
    public state: IState = {
        loading: true,
        abi: null,
        error: null,
    }

    public componentDidMount() {
        eos.getAbi(this.props.contractName)
            .catch((e) => {
                this.setState({
                    loading: false,
                    error: e.message,
                    abi: null,
                })
            })
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
            return <ContractLoader contractName={this.props.contractName} />
        }
        if (this.state.error) {
            return <div style={{ color: "red" }}>Ошибка: {this.state.error}</div>
        }
        const { ricardian_clauses, tables, actions } = this.state.abi as abi_def
        return <React.Fragment>
            <h1>{this.props.contractName}</h1>
            <h3>Tables:</h3>
            <ul>
                {tables && tables.map(
                    table => <li key={table.name}>
                        <ContractTable
                            contractName={this.props.contractName}
                            table={table}
                        />
                    </li>
                )}
            </ul>
            <h3>Ricardian Clauses</h3>
            <ul>
                {
                    ricardian_clauses.map(({ id, body })=> <li key={id}>
                    <h4>{id}</h4>
                        <MDSwitcher source={body} />
                    </li>)
                }
            </ul>
            <h3>Actions:</h3>
            <ul>
                {
                    actions.map(({ name, ricardian_contract })=> <li key={name}>
                    <h4>{name}</h4>
                        <MDSwitcher source={ricardian_contract} />
                    </li>)
                }
            </ul>
        </React.Fragment>
    }
}