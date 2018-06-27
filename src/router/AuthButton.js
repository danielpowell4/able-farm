import React from "react";
import { Link, withRouter } from "react-router-dom";
import { fakeAuth } from "./utils";

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <a
        href="#"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </a>
    ) : (
      <Link to="/login">Login</Link>
    )
);

export default AuthButton;
