import React, { Component } from "react";
import { UserContext } from "../contexts/UserContext";

class Logout extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { user, onLogout } = this.context;

    if (!!user) onLogout();
  }

  render() {
    return <p>Logging Out...</p>;
  }
}

export default Logout;
