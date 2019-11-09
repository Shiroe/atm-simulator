import React from 'react';
import { hot } from 'react-hot-loader';
import './app.component.scss';

import Modal from 'react-modal';

import WithdrawAPI from '../../services/withdrawAPI';
import AtmSimulator from '../atm-simulator/index';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(180,180,180, 0.8)'
  },
  content: {
    boxShadow: '0px 4px 15px 5px rgba(180, 180, 180, 1)',
    borderRadius: '15px',
    width: '40%',
    height: '40%',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CURRENCIES = ['', '$', '€'];
const SEPARATORS = ['', ',', '.', ' '];
const POSTFIXES = ['', '%'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modal: {
        header: 'Loading...',
        content: null
      }
    };

    this.withdraw = this.withdraw.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async withdraw(value) {
    if (Number(value) === 0) {
      this.setState({
        modal: { content: 'Pleace specify the amount.', header: 'Error' }
      });
      return this.handleOpenModal();
    }
    console.log(`Withdrawing ${value}`);
    this.setState({ modal: { content: null, header: 'Loading...' } });

    await WithdrawAPI.withdraw(Number(value))
      .then(({ response: { data } }) => {
        this.setState({
          modal: { content: data.toString(), header: 'Success!' }
        });
      })
      .catch(({ response: { data } }) => {
        this.setState({
          modal: {
            content: data,
            header: 'Error'
          }
        });
      });

    return this.handleOpenModal();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  async handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, modal } = this.state;

    return (
      <div className="App">
        <h1 className="App__heading">ATM Simulator</h1>
        <AtmSimulator
          withdraw={this.withdraw}
          separator={SEPARATORS[1]}
          prefix={CURRENCIES[1]}
          postfix={POSTFIXES[0]}
        />
        <Modal ariaHideApp={false} style={customStyles} isOpen={showModal}>
          <h1 className="Modal__header">{modal.header}</h1>
          <div className="Modal__content">{modal.content}</div>
          <div className="Modal__footer">
            <button onClick={this.handleCloseModal}>Close!</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default hot(module)(App);
