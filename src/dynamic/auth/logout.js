import React from 'react';

function Logout(props) {
  return (
    <div className={props.className}>
      <a onClick={props.logout}>Log off</a>
    </div>
  )
}

export default Logout;
