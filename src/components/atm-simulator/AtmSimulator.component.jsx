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
    this.withdrawAmount = this.withdrawAmount.bind(this);
  }

  onValueChange(value) {
    const { count } = this.state;
    let updatedCount = count;

    if (value === 'del') {
      updatedCount = count.length === 1 ? '0' : count.slice(0, -1);
    } else {
      updatedCount = count === '0' ? value : `${count}${value}`;
    }

    this.setState({ count: updatedCount });
  }

  withdrawAmount() {
    const { withdraw } = this.props;
    const { count } = this.state;
    return withdraw(count);
  }

  render() {
    const { count } = this.state;
    const { isDisabled, separator, prefix, postfix } = this.props;

    return (
      <div className="AtmSimulator">
        <Count
          count={count}
          separator={separator}
          disabled={isDisabled}
          prefix={prefix}
          postfix={postfix}
        />
        <NumPad action={this.onValueChange} disabled={isDisabled} />
        <WithdrawBtn withdraw={this.withdrawAmount} disabled={isDisabled} />
      </div>
    );
  }
}

AtmSimulator.defaultProps = {
  count: '0',
  prefix: '',
  postfix: '',
  separator: null,
  isDisabled: false
};

AtmSimulator.propTypes = {
  count: PropTypes.string,
  separator: PropTypes.string,
  isDisabled: PropTypes.bool,
  withdraw: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string
};

export default AtmSimulator;
