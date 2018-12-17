import React, { Component } from "react";
import SignUpView from "./SignUpView";
import { withRouter } from "react-router";
import app, { db } from "../../base";

class SignUpContainer extends Component {
  state = {
    error: "",
  };

  writeUserData = user => {
    if (user.uid)
      return db
        .collection("users")
        .doc(user["uid"])
        .set(
          {
            uid: user.uid,
            email: user.email,
          },
          { merge: true }
        );
  };

  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      const { user } = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      this.writeUserData(user);
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return <SignUpView error={this.state.error} onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);
