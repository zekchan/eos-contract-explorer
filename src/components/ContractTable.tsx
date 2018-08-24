// import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import * as React from 'react'
import { connect } from 'react-redux';
// import Table from './ui/Table';

interface IProps {
    tableName: string,
}
interface IState {
    expanded: boolean,
}
// const PER_PAGE = 10
class ContractTable extends React.Component<IProps, IState> {
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
                    {/*
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
                    }*/}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    
    private handleClick = (e: React.ChangeEvent, expanded: boolean): void => {
        this.setState({
            expanded,
        })
    }
}

export default connect()(ContractTable)