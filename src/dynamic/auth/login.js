import React from 'react';
import API from '../api/api';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      loginOpen: false,
      forgotPasswordOpen: false,
      forgotPasswordSuccess: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    })
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit(event) {
    console.log("Attempting login...");
    this.props.attemptLogin({
      username: this.state.username,
      password: this.state.password
    });
  }

  handleForgotPassword(event) {
    this.setState({
      loginOpen: false,
      forgotPasswordOpen: true
    })
  }

  handleForgotPasswordSubmit(event) {
    API.post_unsecure('/auth/forgotPassword', {email: this.state.email}, (status) => {
      this.setState({
        forgotPasswordOpen: false,
        forgotPasswordSuccess: true
      })
    })
  }

  closeModals(event) {
    this.setState({
      loginOpen: false,
      forgotPasswordOpen: false,
      forgotPasswordSuccess: false
    })
  }

  render() {
    return (
      <div>
        <p onClick={() => {this.setState((state) => {
          return {'loginOpen': !state.loginOpen}
        })}}>Login</p>
        {this.state.loginOpen &&
          <div className="scs-loginWindow">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
            <a className="scs-button" onClick={this.handleSubmit}>Login</a>
            <a className="scs-button" onClick={this.handleForgotPassword}>Forgot password</a>
          </div>
        }
        {this.state.forgotPasswordOpen &&
          <div className="scs-loginWindow">
            <p>Please enter the email address used for your account</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <a className="scs-button" onClick={this.handleForgotPasswordSubmit}>Submit</a>
          </div>
        }
        {this.state.forgotPasswordSuccess &&
          <div className="scs-loginWindow">
            <p>Please check your email for your username and temporary password</p>
          </div>
        }
        {(this.state.loginOpen || this.state.forgotPasswordOpen || this.state.forgotPasswordSuccess) &&
          <div className="scs-shim" onClick={this.closeModals}></div>
        }
      </div>
    )
  }
}

export default Login;
