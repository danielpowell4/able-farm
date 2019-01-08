import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Auth } from "./utils";

const AuthButton = withRouter(({ history }) =>
  Auth.isAuthenticated() ? (
    <button
      onClick={() => {
        Auth.signout(() => history.push("/"));
      }}
    >
      Sign out
    </button>
  ) : (
    <Link to="/login">Login</Link>
  )
);

export default AuthButton;
