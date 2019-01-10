import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/UserContext";

const DEFAULT_PATH = "/login";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <UserConsumer>
      {({ user }) =>
        user ? (
          <Route
            {...rest}
            render={props => <Component {...props} {...rest} />}
          />
        ) : (
          <Redirect to={DEFAULT_PATH} />
        )
      }
    </UserConsumer>
  );
}
