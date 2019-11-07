import React from 'react';
import { hot } from 'react-hot-loader';
import './app.component.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="App__heading">React Boilerplate</h1>
      </div>
    );
  }
}

export default hot(module)(App);
