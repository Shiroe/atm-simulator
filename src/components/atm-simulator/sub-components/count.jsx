import React from 'react';
import PropTypes from 'prop-types';

function Count({ count, prefix, postfix }) {
  const valueFormatted = `${prefix}${count}${postfix}`;

  return (
    <div className="Count">
      <span className="Count__input">{valueFormatted}</span>
    </div>
  );
}

Count.defaultProps = {
  count: '0',
  prefix: '$',
  postfix: ''
};

Count.propTypes = {
  count: PropTypes.string,
  prefix: PropTypes.string,
  postfix: PropTypes.string
};

export default Count;
