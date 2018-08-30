import React from 'react';

import Username from './username';
import Login from './login';
import Logout from './logout';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.attemptLogin = this.attemptLogin.bind(this);
    this.logout = this.logout.bind(this);

    var userData = decodeToken();

    this.state = {
      username: userData.username,
      admin: userData.admin
    }
  }

  attemptLogin(data) {

    const loginString =
      encodeURIComponent('username') + '=' +
      encodeURIComponent(data.username) + '&' +
      encodeURIComponent('password') + '=' +
      encodeURIComponent(data.password);

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: loginString
    }).then((results) => {
        if (results.status !== 200) { return; }
        return results.text();
    }).then((data) => {
        localStorage.setItem('loginToken', data);
        var userData = decodeToken(data);
        this.setState(userData);
    });

  }

  logout() {
    localStorage.removeItem('loginToken');
    this.setState(decodeToken());
  }

  render() {
    return (
      <div>
        <Username name={this.state.username} />
        <Login attemptLogin={this.attemptLogin}/>
        <Logout logout={this.logout} />
      </div>
    )
  }

}

function decodeToken(token) {

  var loginToken = token || localStorage.getItem('loginToken');

  var userObj = {
    username: null,
    admin: null
  }

  if (loginToken) {
    var encodedDetails = loginToken.split('.')[1];
    var userDetails = JSON.parse(atob(encodedDetails));

    userObj.username = userDetails.user;
    userObj.admin = userDetails.admin;
  }

  return userObj;

}

export default Auth;
