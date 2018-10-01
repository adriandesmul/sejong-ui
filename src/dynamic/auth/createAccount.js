import React from 'react';
import API from '../api/api';

class CreateAccount extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      createAccountOpen: false,
      error: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    console.log("Attempting login...");
    API.post_unsecure('/user/new', {
      username: this.state.username || '',
      password: this.state.password || '',
      email:    this.state.email || ''
    }, (error, msg) => {
      if (error) {
        this.setState({error: msg})
      } else {
        this.setState({
          error: null,
          createAccountOpen: false
        })
        this.props.newAccountLogin(msg)
      }
    })
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = <div className="scs-error">{this.state.error}</div>;
    }

    return (
      <div>
        <p onClick={() => {
          this.setState((state) => {
            return {'createAccountOpen': !state.createAccountOpen}
          })
        }}>Create account</p>
        {this.state.createAccountOpen &&
          <div className="scs-createAccountWindow">
            {error}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <a className="scs-button" onClick={this.handleSubmit}>Create account</a>
          </div>
        }
      </div>
    )
  }
}

export default CreateAccount
