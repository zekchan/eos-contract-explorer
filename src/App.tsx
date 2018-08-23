import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import ContractInput from './components/ContractInput';
import Header from './components/Header';
import { detectScatter } from './Scatter';
const theme = createMuiTheme({});
const styles = () => createStyles({
  content: {
    marginTop: 50,
  },
})

class App extends React.Component<WithStyles<typeof styles>> {
  public componentDidMount() {
    detectScatter()
  }
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <div className={this.props.classes.content}>
          <ContractInput />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
