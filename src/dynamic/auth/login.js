import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropdown-link">
        <a href="https://auth.dev.sejongculturalsociety.info/login?response_type=token&client_id=38b25du3o8d7pc2kqp5jn33duu&redirect_uri=http://localhost:8080/writing/competition.html">
          Login
        </a>
      </div>
    );
  }
}

export default Login;
