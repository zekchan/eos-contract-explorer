import * as React from 'react';
import ContractInfo from './components/ContractInfo';
import ContractInput from './components/ContractInput';
interface IState {
  contractName: string | null,
}
class App extends React.Component<{}, IState> {
  public state: IState = {
    contractName: null,
  }
  public render() {
    const { contractName } = this.state
    return (
      <React.Fragment>
        <ContractInput onChange={this.handleContractNameChange}/>

        {contractName && <ContractInfo contractName={contractName} key={contractName}/>}
      </React.Fragment>
    )
  }

  private handleContractNameChange = (contractName: string): void => {
    this.setState({
      contractName,
    })
  }
}

export default App;
