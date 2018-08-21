import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import Button from '@material-ui/core/Button';

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
    more: boolean,
    page: number,
    opened: boolean,
    loading: boolean,
    rows: any[],
}
export default class ContractTable extends React.Component<IProps, IState> {
    public state = {
        more: false,
        page: 0,
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
                {this.state.rows.length && <React.Fragment>
                    <Table>
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
                    {this.state.page > 0 && <Button onClick={this.handleBack}>Назад</Button>}
                    {this.state.more && <Button onClick={this.handleNext}>Вперед</Button>}
                </React.Fragment>
                }

            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    private loadPage(page: number): void {
        this.setState({
            loading: true,
            page,
        })
        eos.getTableRows(
            true,
            this.props.contractName,
            this.props.scopeName,
            this.props.table.name,
            "",
            (30 * page).toString(),
            "-1",
            30,
        )
            .then(({ rows, more }) => {
                this.setState({
                    more,
                    loading: false,
                    rows,
                })
            })
    }
    private handleClick = () => {
        if (this.state.opened) {
            return this.setState({
                opened: false,
                page: 0,
                rows: [],
            })
        }
        this.setState({
            opened: true,
        })
        this.loadPage(0)
    }
    private handleBack = () => {
        this.loadPage(this.state.page - 1)
    }
    private handleNext = () => {
        this.loadPage(this.state.page + 1)
    }
}