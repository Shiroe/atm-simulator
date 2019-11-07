import React from 'react';
import PropTypes from 'prop-types';

function WithdrawBtn({ withdraw }) {
  return (
    <div className="WithdrawBtn">
      <button className="WithdrawBtn__button" onClick={withdraw}>
        Withdraw
      </button>
    </div>
  );
}

WithdrawBtn.propTypes = {
  withdraw: PropTypes.func.isRequired
};

export default WithdrawBtn;
