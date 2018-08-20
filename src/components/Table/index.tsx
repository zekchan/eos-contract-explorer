import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { table_def } from 'eosjs-api';
import * as React from 'react'
import eos from '../../eosService';

interface IProps {
    contractName: string,
    scopeName: string,
    table: table_def,
    structs: {
        [name: string]: {
            name: string,
            fields: Array<{
                name: string,
                id: string,
            }>,
        },
    },
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
    public render() {
        const fieldsList = this.props.structs[this.props.table.type].fields
        return <ExpansionPanel onChange={this.handleClick} expanded={this.state.opened}>
            <ExpansionPanelSummary>
                <Typography>{this.props.table.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {this.state.loading && <LinearProgress />}
                {this.state.rows.length && <Table>
                    <TableHead>
                        <TableRow>
                            {fieldsList.map(({ name }) => (
                                <TableCell key={name}>
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    {fieldsList.map(({ name }) => (
                                        <TableCell key={name}>
                                            {JSON.stringify(row[name])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                }

            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    private handleClick = () => {
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
            this.props.scopeName,
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