import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../state/reducers';
import { setNode } from '../state/reducers/Network';
import ScatterLogin from './ScatterLogin';
import ButtonSelect from './ui/ButtonSelect';


class Header extends React.Component<IState['network'] & { setNode(node: string): void }> {
    public render() {
        return (
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                        Eos Contract Explorer
                    </Typography>
                    <ButtonSelect value={this.props.node} options={this.props.availebleNodes} onChange={this.props.setNode}/>
                    <ScatterLogin />
                </Toolbar>
            </AppBar>
        )
    }
}
const mapStateToProps = (state: IState) => state.network
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ setNode }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Header)