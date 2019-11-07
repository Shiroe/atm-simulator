import React from 'react';
import PropTypes from 'prop-types';

const NUMPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'];

function NumPad({ action }) {
  function onKeyboardKeyUp(ev) {
    if (!ev) return;
    const actionToSend = NUMPAD[0];
    return action(actionToSend);
  }

  return (
    <div className="NumPad">
      {NUMPAD.map((key, i) => (
        <div
          key={key}
          className="NumPad__key"
          role="button"
          tabIndex={i}
          onClick={() => action(key)}
          onKeyUp={onKeyboardKeyUp}
        >
          <span className="NumPad__key--label">{key}</span>
        </div>
      ))}
    </div>
  );
}

NumPad.propTypes = {
  action: PropTypes.func.isRequired
};

export default NumPad;
