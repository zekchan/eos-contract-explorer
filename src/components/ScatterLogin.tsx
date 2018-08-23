import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import getScatter from '../Scatter'
import { IState } from '../state/reducers';
import { setAccountName } from '../state/reducers/Account';
import ScatterLogo from './ui/ScatterLogo';


class ScatterLogin extends React.Component<IState['account'] & { setAccountName(name: string): void }> {
    public render() {
        if (this.props.account) {
            return <Typography>{this.props.account}</Typography>
        }
        return (
            <Button color="inherit" onClick={this.handleLogin}>Link <ScatterLogo style={{ marginLeft: 5 }} /></Button>
        )
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
        .then(identity => {
            const account = identity.accounts[0]
            this.props.setAccountName(account.name)
        })
        .catch(error => {
            // tslint:disable-next-line:no-console
            console.error(error)
        })
    }
}
const mapStateToProps = (state: IState) => state.account
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAccountName: (account: string) => dispatch(setAccountName(account))
})
export default connect(mapStateToProps, mapDispatchToProps)(ScatterLogin)