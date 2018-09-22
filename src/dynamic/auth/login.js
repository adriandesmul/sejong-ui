import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    })
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
      <div className={this.props.className}>
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
        />
        <a onClick={this.handleSubmit}>Login</a>
      </div>
    )
  }
}

export default Login;
