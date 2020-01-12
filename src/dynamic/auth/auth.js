import React from "react";

import Username from "./username";
import Login from "./login";
import Logout from "./logout";
import "./auth.scss";

// TODO: When get a fail, drop the token or refresh

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    const url_hash = window.location.hash;
    let token;

    if (url_hash.indexOf("id_token") !== -1) {
      token = url_hash.substring(
        url_hash.indexOf("id_token") + 9,
        url_hash.indexOf("&", url_hash.indexOf("id_token"))
      );
      localStorage.setItem("loginToken", token);
      decodeToken(token);
    }

    var userData = decodeToken();

    this.state = {
      username: userData.username,
      admin: userData.admin
    };
  }

  logout() {
    localStorage.removeItem("loginToken");
    this.setState(decodeToken());
    window.location.reload();
  }

  render() {
    if (!this.state.username) {
      return (
        <div className="scs-auth">
          <Login />
        </div>
      );
    } else {
      return (
        <div className="scs-auth dropdown-item">
          <div className="dropdown-link">
            <Username name={this.state.username} />
            <Logout logout={this.logout} />
          </div>
        </div>
      );
    }
  }
}

function decodeToken(token) {
  var loginToken = token || localStorage.getItem("loginToken");

  var userObj = {
    username: null,
    admin: null
  };

  if (loginToken) {
    var encodedDetails = loginToken.split(".")[1];
    var userDetails;

    try {
      userDetails = JSON.parse(atob(encodedDetails));
    } catch (error) {
      localStorage.clear();
    }

    if (!userDetails) {
      return userObj;
    }
    userObj.username = userDetails.email;
    userObj.sub = userDetails.sub;
    userObj.admin = userDetails.admin;
  }

  return userObj;
}

export default Auth;
