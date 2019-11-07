import React from 'react';
import PropTypes from 'prop-types';

import Count from './sub-components/count';
import NumPad from './sub-components/numPad';
import WithdrawBtn from './sub-components/withdrawBtn';

import './AtmSimulator.component.scss';

class AtmSimulator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.count
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    if (value === 'del') return;

    const { count } = this.state;
    const updatedCount = `${count}${value}`;

    this.setState({ count: updatedCount });
  }

  withdrawAmount() {
    // send clean numeric value only

    const { withdraw } = this.props;
    const { count } = this.state; // should be formatted to clean numeric value before send
    return withdraw(count);
  }

  render() {
    const { count } = this.state;
    const { isDisabled } = this.props;

    return (
      <div className="AtmSimulator">
        <Count count={count} disabled={isDisabled} />
        <NumPad action={this.onValueChange} disabled={isDisabled} />
        <WithdrawBtn withdraw={this.withdrawAmount} disabled={isDisabled} />
      </div>
    );
  }
}

AtmSimulator.defaultProps = {
  count: '0',
  separator: null,
  isDisabled: false
};

AtmSimulator.propTypes = {
  count: PropTypes.string,
  separator: PropTypes.string,
  isDisabled: PropTypes.bool,
  withdraw: PropTypes.func.isRequired
};

export default AtmSimulator;
