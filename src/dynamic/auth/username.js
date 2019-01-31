import React from 'react';

function Username(props) {
  if (props.name) {
    return <a>{props.name} |&nbsp;</a>;
  }
  return <div></div>;
}

export default Username;
