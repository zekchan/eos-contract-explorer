import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
import getScatter, { IIdentity } from '../Scatter'
import { IState } from '../state/reducers';
import { setIdentity } from '../state/reducers/Account';
import ScatterLogo from './ui/ScatterLogo';


class ScatterLogin extends React.Component<IStateToProps & IDispatchToProps> {
    public render() {
        if (this.props.name) {
            return <React.Fragment>
                <Typography color="inherit">{this.props.name}</Typography>
                <Button color="inherit" onClick={this.handleLogout}>Detach</Button>
            </React.Fragment>
        }
        return (
            <Button color="inherit" onClick={this.handleLogin}>Link <ScatterLogo style={{ marginLeft: 5 }} /></Button>
        )
    }
    private handleLogout = () => {
        if (!this.props.scatterAvailable) {
            // tslint:disable-next-line:no-console
            return console.log('Нету скаттера!')
        }
        getScatter().forgetIdentity()
        this.props.setIdentity(null)
    }
    private handleLogin = () => {
        if (!this.props.scatterAvailable) {
            // tslint:disable-next-line:no-console
            return console.log('Нету скаттера!')
        }
        getScatter().getIdentity({
            accounts: [
                {
                    blockchain: 'eos',
                    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
                }
            ]
        })
            .then(this.props.setIdentity)
            .catch(error => {
                // tslint:disable-next-line:no-console
                console.error(error)
            })
    }
}
interface IStateToProps {
    scatterAvailable: boolean;
    name: string | null;
}
const mapStateToProps = ({ account }: IState): IStateToProps => ({
    scatterAvailable: account.scatterAvailable,
    name: account.account ? account.account.accounts[0].name : null,
})
interface IDispatchToProps {
    setIdentity(ident: IIdentity | null): void
}
const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => bindActionCreators({ setIdentity }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ScatterLogin)