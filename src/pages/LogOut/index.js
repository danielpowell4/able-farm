import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../base";

const REDIRECT_PATH = "/login";

class LogOut extends Component {
  componentDidMount() {
    app
      .auth()
      .signOut()
      .then()
      .catch(error => {
        alert(error);
      });

    this.props.history.push(REDIRECT_PATH);
  }

  render() {
    return <p>Logging out...</p>;
  }
}

export default withRouter(LogOut);
