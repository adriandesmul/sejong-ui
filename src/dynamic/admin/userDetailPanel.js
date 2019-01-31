import React from 'react';
import JWT from '../api/jwt';
import API from '../api/api';

class UserDetailPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JWT(),
      id: window.location.search.substring(4),
      data: null
    }
  }

  componentDidMount() {
    API.get('/admin/users/' + this.state.id, (err, data) => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    var userData = [];

    if (this.state.data) {
      for (let key in this.state.data) {
        userData.push(
          <div className="adminDetailRow" key={key}>
            <div className="adminDetailRow-key">{key}</div>
            <div className="adminDetailRow-value">{this.state.data[key]}</div>
          </div>
        );
      }
    }

    if (this.state.user.admin) {
      return (
        <div>
          <h2>Welcome {this.state.user.username}</h2>
          <a href="/admin">Back to admin panel</a>
          {userData}
        </div>
      )
    } else {
      return (
        <h2>Please login above or return to the homepage</h2>
      )
    }
  }
}

export default UserDetailPanel
