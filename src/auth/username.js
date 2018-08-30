import React from 'react';

function Username(props) {
  if (props.name) {
    return <p>You are logged in as {props.name}</p>;
  }
  return <p>You are not logged in :(</p>;
}

export default Username;
