import React from 'react';

function Logout(props) {
  return (
    <div>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}

export default Logout;
