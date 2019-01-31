import React from 'react';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
  }

  render() {
    return (
      <div className="adminUserRow">
        <div className="cell-short">{this.state.user_id}</div>
        <div className="cell-medium">
          <a href={"./userDetail.html?id=" + this.state.user_id}>{this.state.username}</a>
        </div>
        <div className="cell-long">{this.state.email}</div>
        <div className="cell-medium">{this.state.personal_first_name}</div>
        <div className="cell-medium">{this.state.personal_last_name}</div>
      </div>
    )
  }
}

export default UserDetail
