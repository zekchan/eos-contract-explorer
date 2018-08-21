import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { abi_def, getAbiResult } from "eosjs-api";
import * as React from "react"
import eos from "../../eosService"
import RicardianText from '../RicardianText';
import ContractTable from "../Table";

interface IProps {
    contractName: string,
    scopeName: string,
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
            return <LinearProgress />
        }
        if (this.state.error) {
            return <div style={{ color: "red" }}>Ошибка: {this.state.error}</div>
        }
        const { ricardian_clauses, tables, actions, structs } = this.state.abi as abi_def
        const structsMap = structs.reduce((acc, struct) => Object.assign(acc, { [struct.name]: struct }), {})
        return <Card>
            <CardContent>
                <Typography variant="headline">
                    {this.props.contractName}
                </Typography>
                <Typography variant='subheading'>Tables:</Typography>
                <ul>
                    {tables && tables.map(
                        table =>
                            <ContractTable
                                scopeName={this.props.scopeName}
                                key={table.name}
                                contractName={this.props.contractName}
                                table={table}
                                structs={structsMap}
                            />
                    )}
                </ul>
                <Typography variant='subheading'>Ricardian Clauses</Typography>
                {
                    ricardian_clauses
                        .sort(({ body }) => body.length ? -1 : 1)
                        .map(({ id, body }) =>
                            <RicardianText name={id} body={body} key={id} />
                        )
                }
                <Typography variant='subheading'>Actions</Typography>
                {
                    actions
                        .sort(({ ricardian_contract }) => ricardian_contract.length ? -1 : 1)
                        .map(({ name, ricardian_contract }) =>
                            <RicardianText name={name} body={ricardian_contract} key={name}/>
                        )
                }
            </CardContent>
        </Card>
    }
}