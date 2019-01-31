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
    var essayData, sijoData;

    if (this.state.data) {
      for (let key in this.state.data) {
        if (key == "essay") {
          let essay = this.state.data[key];
          let essayBody = {__html: essay.body}
          essayData = (
            <div className="adminDetailWriting">
              <p><strong>Title: </strong>{essay.title}</p>
              <p><strong>Division: </strong>{essay.division}</p>
              <p><strong>Folktale: </strong>{essay.folktale}</p>
              <div dangerouslySetInnerHTML={essayBody}></div>
            </div>
          )
        } else if (key == "sijo") {
          let sijo = this.state.data[key];
          let sijoBody = {__html: sijo.body}
          sijoData = (
            <div className="adminDetailWriting">
              <p><strong>Title: </strong>{sijo.title}</p>
              <p><strong>Division: </strong>{sijo.division}</p>
              <div dangerouslySetInnerHTML={sijoBody}></div>
            </div>
          )
        } else {
          userData.push(
            <div className="adminDetailRow" key={key}>
              <div className="adminDetailRow-key">{key}</div>
              <div className="adminDetailRow-value">{this.state.data[key]}</div>
            </div>
          );
        }
      }
    }

    if (this.state.user.admin) {
      return (
        <div>
          <h2>Welcome {this.state.user.username}</h2>
          <a href="/admin">Back to admin panel</a>
          <h2>Demographic data</h2>
          {userData}
          <h2>Sijo</h2>
          {sijoData}
          <h2>Essay</h2>
          {essayData}
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
