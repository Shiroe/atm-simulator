import React from 'react';
import PropTypes from 'prop-types';

const NUMPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

function NumPad({ action }) {
  function onKeyboardKeyUp(ev) {
    ev.persist();
    if (!ev) return;
    const key = ev.key === 'Backspace' ? 'del' : ev.key;
    const index = NUMPAD.indexOf(key);

    if (index === -1) return;

    const actionToSend = NUMPAD[index];
    return action(actionToSend);
  }

  return (
    <div className="NumPad">
      {NUMPAD.map(key => (
        <div
          key={key}
          className="NumPad__key"
          role="button"
          tabIndex={0}
          onClick={() => action(key)}
          onKeyUp={onKeyboardKeyUp}
        >
          {key && (
            <span className="NumPad__key--label">
              {key === 'del' ? <i className="fa fa-backspace"></i> : key}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

NumPad.propTypes = {
  action: PropTypes.func.isRequired
};

export default NumPad;
