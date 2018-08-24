import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../state/reducers';
import { ITablesFields, tablesFieldsSelector } from '../state/reducers/Contract';
import { ITable, ITablesState, loadMoreRows } from '../state/reducers/Tables';
import Table from './ui/Table';

interface IProps {
    tableName: string,
}
interface ILocalState {
    expanded: boolean,
}
const PER_PAGE = 10
class ContractTable extends React.Component<IMergedProps, ILocalState> {
    public state = {
        expanded: false,
    }
    public render() {
        return <ExpansionPanel onChange={this.handleClick} expanded={this.state.expanded}>
            <ExpansionPanelSummary>
                <Typography>{this.props.tableName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <div style={{ overflowX: 'scroll' }}>
                        <Table
                            loading={this.props.loading}
                            rows={this.props.rows}
                            fields={this.props.fields}
                            indexField={this.props.key}
                        />
                    </div>
                    {
                        !this.props.loading && this.props.more &&
                        <Button variant="outlined" size="small" color="primary" onClick={this.handleNext}>
                            More
                        </Button>
                    }
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    private handleNext = () => {
        this.props.loadMoreRows()
    }
    private handleClick = (e: React.ChangeEvent, expanded: boolean): void => {
        this.setState({
            expanded,
        })
        if (expanded && this.props.rows.length === 0) {
            this.handleNext()
        }
    }
}
interface IStateToProps {
    tablesFields: ITablesFields
    tables: ITablesState,
}
interface IDispatchToProps {
    loadMoreRows: typeof loadMoreRows
}
interface IMergedProps extends IProps, ITable {
    fields: string[],
    loadMoreRows(): void;
}
const mapStateToProps = (state: IState): IStateToProps => ({
    tablesFields: tablesFieldsSelector(state),
    tables: state.tables,
})

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => bindActionCreators({ loadMoreRows }, dispatch)
const mergeProps = (stateProps: IStateToProps, dispatchProps: IDispatchToProps, ownProps: IProps): IMergedProps => {
    return ({
        tableName: ownProps.tableName,
        loadMoreRows: () => dispatchProps.loadMoreRows(PER_PAGE, ownProps.tableName),
        fields: stateProps.tablesFields[ownProps.tableName],
        ...stateProps.tables[ownProps.tableName],
    })
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ContractTable)