import React from 'react';
import API from '../api/api';
import UserDetail from './userDetail'
import './admin.scss';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      haveData: false
    }
  }

  componentDidMount() {
    API.get('/admin/users', (err, data) => {
      this.setState({
        users: data,
        haveData: true
      })
    })
  }

  render() {

    var users = this.state.users.map((i) => {
      return ( <UserDetail key={i.user_id} user={i} /> )
    })

    return (
      <div className="adminUserList">
        <div className="adminUserRow adminRowHeader">
          <div className="cell-short">ID</div>
          <div className="cell-medium">Username</div>
          <div className="cell-long">Email</div>
          <div className="cell-medium">First name</div>
          <div className="cell-medium">Last name</div>
        </div>
        {users}
      </div>
    )
  }
}

export default UserList
