import React from 'react';

const ToggleButton = props => {
  return (
    <button
      onClick={() => props.select()}
      className={'btn ' + (props.selected ? 'btn--selected' : '')}
    >
      {props.text}
    </button>
  );
};

export default ToggleButton;
