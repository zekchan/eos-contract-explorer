import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { table_def } from 'eosjs-api';
import * as React from 'react'
import eos from '../eosService';
import Table from './ui/Table';

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
    page: number,
    more: boolean,
    indexField: string,
    expanded: boolean,
    loading: boolean,
    fields: string[],
    pagesLoaded: number,
    pages: {
        [page: number]: Array<{ [field: string]: string }>
    }
}
const PER_PAGE = 10
export default class ContractTable extends React.Component<IProps, IState> {
    public static getDerivedStateFromProps(newProps: IProps): Partial<IState> {
        return {
            fields: newProps.structs[newProps.table.type].fields.map(({ name }) => name),
            indexField: newProps.table.key_names[0]
        }
    }
    public state = {
        indexField: '',
        fields: [],
        page: 0,
        pagesLoaded: 0,
        more: false,
        expanded: false,
        loading: false,
        pages: [],
    }
    public render() {
        const { loading, pages, page, indexField, fields, more, pagesLoaded } = this.state
        return <ExpansionPanel onChange={this.handleClick} expanded={this.state.expanded}>
            <ExpansionPanelSummary>
                <Typography>{this.props.table.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <div style={{ overflowX: 'scroll' }}>
                        <Table
                            loading={loading}
                            rows={pages[page]}
                            fields={fields}
                            indexField={indexField}
                        />
                    </div>
                    {
                        page > 0 && !loading &&
                        <Button variant="outlined" size="small" color="primary" onClick={this.handlePrev}>
                            Back
                    </Button>
                    }
                    {
                        (more || pagesLoaded > page) && !loading &&
                        <Button variant="outlined" size="small" color="primary" onClick={this.handleNext}>
                            Next
                    </Button>
                    }
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    private getLowerBoundForPage(page: number): string {
        if (page <= 0) {
            return ''
        }
        const prevPage = this.state.pages[page - 1]
        // @ts-ignore
        const lastKeyOnPrevPage = prevPage[prevPage.length - 1]
        return lastKeyOnPrevPage[this.state.indexField]
    }
    private loadPage(page: number): Promise<void> {
        return eos(this.context.store.getState()).getTableRows(
            true,
            this.props.contractName,
            this.props.scopeName,
            this.props.table.name,
            "",
            this.getLowerBoundForPage(page),
            "",
            PER_PAGE,
        )
            .then(({ rows, more }) => {
                this.setState((s) => ({
                    more,
                    pages: {
                        ...s.pages,
                        [page]: rows,
                    },
                    pagesLoaded: page,
                }))
            })
    }
    private setPage(page: number): void {
        this.setState({
            page,
        })
        if (!this.isPageLoaded(page)) {
            this.setState({
                loading: true,
            })
            this.loadPage(page)
                .then(() => {
                    this.setState({
                        loading: false,
                    })
                })
        }
    }
    private isPageLoaded(page: number): boolean {
        return !!this.state.pages[page]
    }
    private handleClick = (e: React.ChangeEvent, expanded: boolean): void => {
        this.setState({
            expanded,
        })
        if (expanded) {
            this.setPage(this.state.page)
        }
    }
    private handleNext = () => {
        this.setPage(this.state.page + 1)
    }
    private handlePrev = () => {
        this.setPage(this.state.page - 1)
    }
}