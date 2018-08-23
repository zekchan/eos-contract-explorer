import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../state/reducers';
import Actions from './tabs/Actions';
import RicardianClauses from './tabs/RicardianClauses';
import Tables from './tabs/Tables';

interface IProps {
    loading: boolean,
    contractName: string,
}
type Tabs = 'clauses' | 'actions' | 'tables'
const componentByTab = {
    clauses: RicardianClauses,
    actions: Actions,
    tables: Tables,
}
class ContractInfo extends React.Component<IProps, { tab: Tabs }> {
    public state = {
        tab: 'clauses' as Tabs,
    }

    public render() {
        if (!this.props.contractName) {
            return null
        }
        if (this.props.loading) {
            return <LinearProgress />
        }

        return <React.Fragment>
            <AppBar position="static" color="secondary">
                <Tabs value={this.state.tab} onChange={this.handleTab}>
                    {/*<Tab label="Tables" />*/}
                    <Tab label="Ricardian Clauses" value='clauses' />
                    <Tab label="Actions" value='actions' />
                    <Tab label="Tables" value='tables' />
                </Tabs>
            </AppBar>
            {React.createElement(componentByTab[this.state.tab])}
        </React.Fragment>
    }
    private handleTab = (e: React.MouseEvent, tab: Tabs) => {
        this.setState({ tab })
    }
}

const mapStateToProps = (state: IState) => ({
    loading: state.contract.loading,
    contractName: state.contract.account,
})

export default connect(mapStateToProps)(ContractInfo)