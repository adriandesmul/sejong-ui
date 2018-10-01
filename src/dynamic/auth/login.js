import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      loginOpen: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
          </div>
        }
      </div>
    )
  }
}

export default Login;
