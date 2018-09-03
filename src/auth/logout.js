import React from 'react';

function Logout(props) {
  return (
    <div className={props.className}>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}

export default Logout;
