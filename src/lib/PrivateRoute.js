import React from "react";
import { Route, Redirect } from "react-router-dom";

const DEFAULT_PATH = "/login";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component authenticated={authenticated} {...props} {...rest} />
        ) : (
          <Redirect to={DEFAULT_PATH} />
        )
      }
    />
  );
}
