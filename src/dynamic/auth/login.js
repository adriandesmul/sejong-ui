import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url =
      "https://auth.dev.sejongculturalsociety.info/login?response_type=token&client_id=38b25du3o8d7pc2kqp5jn33duu&redirect_uri=" +
      AUTH_URL +
      "/writing/competition.html";

    return (
      <div className="dropdown-link">
        <a href={url}>Login</a>
      </div>
    );
  }
}

export default Login;
