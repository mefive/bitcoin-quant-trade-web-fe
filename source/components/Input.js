import React, { Component, PropTypes } from 'react'

function isCheckable(type) {
  return ['checkbox', 'radio'].indexOf(type) !== -1;
}

class Input extends Component {
  render() {
    const { type, value, onChange } = this.props;

    return (
      <input
        {...this.props}
        onChange={e => {
          let value;

          if (isCheckable(type)) {
            value = e.target.checked;
          }
          else {
            value = e.target.value;
          }

          onChange(value, e);
        }}
        value={isCheckable(type) ? '' : value}
        checked={isCheckable(type) ? value : null }
      />
    );
  }
}

export default Input;
