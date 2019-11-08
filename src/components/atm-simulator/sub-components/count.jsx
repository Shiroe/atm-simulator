import React from 'react';
import PropTypes from 'prop-types';

const fromattedValue = ({ count, prefix, postfix, separator }) => {
  let value = count;

  if (separator) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }

  return `${prefix}${value}${postfix}`;
};

function Count(props) {
  return (
    <div className="Count">
      <span className="Count__input">{fromattedValue(props)}</span>
    </div>
  );
}

Count.defaultProps = {
  count: '0',
  prefix: '$',
  postfix: '',
  separator: null
};

Count.propTypes = {
  count: PropTypes.string,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  separator: PropTypes.string
};

export default Count;
