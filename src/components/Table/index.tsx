import { table_def } from 'eosjs-api';
import * as React from 'react'
import * as JSONPretty from 'react-json-pretty';
import eos from '../../eosService';

interface IProps {
    contractName: string,
    table: table_def,
}
interface IState {
    opened: boolean,
    loading: boolean,
    rows: any[],
}
export default class ContractTable extends React.Component<IProps, IState> {
    public state = {
        opened: false,
        loading: false,
        rows: [],
    }
    private scopeInput = React.createRef<HTMLInputElement>()
    public render() {
        return <React.Fragment>
            <a onClick={this.handleClick}>{this.props.table.name}</a>
            <input defaultValue="saynananapls" ref={this.scopeInput}/>
            {this.state.loading && "Loading..."}
            {this.state.rows.map((data, idx) => <JSONPretty json={data} key={idx}/>)}
        </React.Fragment>
    }
    private handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (this.state.opened) {
            return this.setState({
                opened: false,
                rows: [],
            })
        }
        this.setState({
            opened: true,
            loading: true,
        })
        eos.getTableRows(
            true,
            this.props.contractName,
            this.scopeInput.current ? this.scopeInput.current.value : this.props.contractName,
            this.props.table.name,
            "",
            "0",
            "-1",
            10,
        )
            .then(({ rows }) => {
                this.setState({
                    loading: false,
                    rows,
                })
            })
    }
}