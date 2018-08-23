import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../state/reducers';
import Actions from './tabs/Actions';
import RicardianClauses from './tabs/RicardianClauses';

interface IProps {
    loading: boolean,
    contractName: string,
}
type Tabs = 'clauses' | 'actions'
const componentByTab = {
    clauses: RicardianClauses,
    actions: Actions,
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