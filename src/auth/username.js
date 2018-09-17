import React from 'react';
import './username.scss';

function Username(props) {
  if (props.name) {
    return <p>You are logged in as {props.name}</p>;
  }
  return <p class="username">You are not logged in :(</p>;
}

export default Username;
