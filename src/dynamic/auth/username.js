import React from 'react';

function Username(props) {
  if (props.name) {
    return <div>{props.name} |&nbsp;</div>;
  }
  return <div></div>;
}

export default Username;
