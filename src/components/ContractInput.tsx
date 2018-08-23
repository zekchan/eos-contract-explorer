import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ContractInfo from './ContractInfo';

interface IState {
  contractName: string,
  submitted: boolean,
  scopeName: string,
}
const styles = (theme: Theme) => createStyles({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})
class ContractInput extends React.Component<WithStyles<typeof styles>, IState> {
  public state: IState = {
    contractName: 'eosio',
    scopeName: 'eosio',
    submitted: false,
  }
  public render() {
    const { contractName, submitted, scopeName } = this.state
    const { classes: { textField } } = this.props
    return (
        <Grid container={true} direction='column' justify='center' spacing={40}>
          <Grid item={true} xs={12}>
            <Card>
              <CardContent>
                <form onSubmit={this.handleFormSubmit} autoComplete='off' noValidate={true}>
                  <TextField
                    label="Контракт"
                    autoFocus={true}
                    className={textField}
                    placeholder="wizardstoken"
                    value={contractName}
                    onChange={this.handleContractNameChange}
                    margin="normal"
                  />
                  <TextField
                    label="Аккаунт"
                    placeholder="saynananapls"
                    className={textField}
                    value={scopeName}
                    onChange={this.handleScopeNameChange}
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" type='submit'>
                    GO
            </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item={true} xs={12}>
            {submitted && <ContractInfo contractName={contractName} scopeName={this.state.scopeName} />}
          </Grid>
        </Grid>
    )
  }
  private handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      submitted: true,
    })

  }
  private handleContractNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      contractName: e.target.value,
      submitted: false,
    })
  }
  private handleScopeNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      scopeName: e.target.value,
      submitted: false,
    })
  }
}

export default withStyles(styles)(ContractInput)
