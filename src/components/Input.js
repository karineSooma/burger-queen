import React from 'react';

function Input(props) {
  return (
    <input className="form-control" onChange={props.onChange} value={props.value} placeholder={props.placeholder} />
  );
}

export default Input;