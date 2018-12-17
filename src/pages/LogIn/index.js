import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import app from "../../base";

class LogInContainer extends Component {
  state = {
    error: "",
  };

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return <LogInView error={this.state.error} onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(LogInContainer);
