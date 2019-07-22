import React from 'react';
import classNames from 'classnames';
import API from '../api/api';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.color = this.color.bind(this);
    this.spoof = this.spoof.bind(this);
  }

  color(status) {
    return classNames(['cell-short', status ? 'cell-success':'cell-failure'])
  }

  spoof() {
    API.post('/admin/spoof', {username: this.state.username}, (err, data) => {
      data.then((token) => {
        console.log(token)
      })
    })
  }

  render() {
    return (
      <div className="adminUserRow">
        <div className="cell-short"><a onClick={this.spoof}>{this.state.user_id}</a></div>
        <div className="cell-medium">
          <a href={"./userDetail.html?id=" + this.state.user_id}>{this.state.username}</a>
        </div>
        <div className="cell-long">{this.state.email}</div>
        <div className="cell-medium">{this.state.personal_first_name}</div>
        <div className="cell-medium">{this.state.personal_last_name}</div>
        <div className={this.color(this.state.demo_status)}>{this.state.demo_status}</div>
        <div className={this.color(this.state.sijo_status)}>{this.state.sijo_status}</div>
        <div className={this.color(this.state.essay_status)}>{this.state.essay_status}</div>
      </div>
    )
  }
}

export default UserDetail
