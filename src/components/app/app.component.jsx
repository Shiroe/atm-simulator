import React from 'react';
import { hot } from 'react-hot-loader';
import './app.component.scss';

import WithdrawAPI from '../../services/withdrawAPI';
import AtmSimulator from '../atm-simulator/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.withdraw = this.withdraw.bind(this);
  }

  withdraw(value) {
    if (Number(value) === 0) return console.log('Please specify the amount');
    console.log(`Withdrawing ${value}`);

    WithdrawAPI.withdraw(Number(value))
      .then(data => {
        console.log('SUCCESS: ', data);
        alert(data);
      })
      .catch(error => alert(error));
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__heading">ATM Simulator</h1>
        <AtmSimulator
          withdraw={this.withdraw}
          separator=","
          prefix="$"
          postfix=""
        />
      </div>
    );
  }
}

export default hot(module)(App);
