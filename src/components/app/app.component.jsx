import React from 'react';
import { hot } from 'react-hot-loader';
import './app.component.scss';

import AtmSimulator from '../atm-simulator/index';

class App extends React.Component {
  constructor() {
    super();

    this.withdraw = this.withdraw.bind(this);
  }

  withdraw(value) {
    console.log(`Withdrawing ${value}`);
  }

  render() {
    return (
      <div className="App">
        <AtmSimulator withdraw={this.withdraw} />
      </div>
    );
  }
}

export default hot(module)(App);
