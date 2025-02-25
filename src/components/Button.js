import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button className='btn btn-success btn-first-page' onClick={props.onClick}>
    {props.text}
    </button>
  )
}
export default Button;