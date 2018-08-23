import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { IState } from '../state/reducers';
import { setNode } from '../state/reducers/Network';
import ButtonSelect from './ui/ButtonSelect';
import ScatterLogo from './ui/ScatterLogo';


class Header extends React.Component<IState['network'] & { setNode(node: string): void }> {
    public render() {
        return (
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                        Eos Contract Explorer
                    </Typography>
                    <ButtonSelect value={this.props.node} options={this.props.availebleNodes} onChange={this.props.setNode}/>
                    <Button color="inherit">Link <ScatterLogo style={{ marginLeft: 5 }} /></Button>
                </Toolbar>
            </AppBar>
        )
    }
}
const mapStateToProps = (state: IState) => state.network
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setNode: (node: string) => dispatch(setNode(node))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)