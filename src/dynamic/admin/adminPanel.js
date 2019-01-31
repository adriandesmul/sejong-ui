import React from 'react';

import JWT from '../api/jwt';
import UserList from './userList';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = JWT()
  }

  render() {
    if (this.state.admin) {
      return (
        <div>
          <h2>Welcome {this.state.username}</h2>
          <UserList />
        </div>
      )
    } else {
      return (
        <h2>Please login above or return to the homepage</h2>
      )
    }
  }
}

export default AdminPanel
