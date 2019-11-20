import React from 'react';
// import { hot } from 'react-hot-loader';
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

const BANKNOTES = [100, 500, 1000];

function isValidAmount(amount) {
  return amount % BANKNOTES[0] === 0;
}

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

    this.tryWithdraw = this.tryWithdraw.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  tryWithdraw(value) {
    if (Number(value) === 0) {
      this.setState({
        modal: { content: 'Pleace specify the amount.', header: 'Error' }
      });
      return this.handleOpenModal();
    }

    if (!isValidAmount(value)) {
      this.setState({
        modal: {
          content: (
            <>
              <p>Invalid amount for withdrawl.</p>
              <p>
                Available banknotes for withdrawal are:
                <br />
                {BANKNOTES.map(bn => (
                  <p key={bn}>
                    {CURRENCIES[1]}
                    {bn}
                  </p>
                ))}
              </p>
            </>
          ),
          header: 'Error'
        }
      });
      return this.handleOpenModal();
    }

    this.withdraw(value);
  }

  async withdraw(value) {
    console.log(`Withdrawing ${value}`);
    this.setState({ modal: { content: null, header: 'Loading...' } });

    const [error, data] = await WithdrawAPI.withdraw(Number(value));

    if (error) {
      this.setState({ modal: { content: data, header: 'Error' } });
    } else {
      this.setState({
        modal: {
          content: (
            <>
              <p>Please take your cash</p>
              <p>
                {data.map(bn => (
                  <p key={bn}>
                    <i className="fa fa-money-bill-wave"></i>
                    {CURRENCIES[1]}
                    {bn.banknoteValue}
                    {': '}
                    {bn.quantity}
                  </p>
                ))}
              </p>
            </>
          ),
          header: 'Success!'
        }
      });
    }

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
          withdraw={this.tryWithdraw}
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

export default App;

/**
 * Uncomment hot import and below lines
 * for hot module reloading during
 * development only `npm run dev:hot`.
 **/

// export default hot(module)(App);
