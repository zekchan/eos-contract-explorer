import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import ContractInput from './components/ContractInput';
import Header from './components/Header';
import { detectScatter } from './Scatter';

const styles = (theme: Theme) => createStyles({
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
      <React.Fragment>
        <Header />
        <div className={this.props.classes.content}>
          <ContractInput />
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)
