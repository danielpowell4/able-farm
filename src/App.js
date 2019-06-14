import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { PrivateRoute } from "./lib";
import {
  Login,
  Logout,
  Signup,
  Home,
  GardenNewPage,
  GardenShowPage,
} from "./pages";

import { UserConsumer } from "./contexts/UserContext";

// TODO: fancify Loader

const Loader = _ => (
  <div>
    <p>Loading...</p>
  </div>
);
const App = _ => (
  <UserConsumer>
    {({ user, loading }) =>
      loading ? (
        <Loader />
      ) : (
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/gardens/new" component={GardenNewPage} />
            <PrivateRoute
              exact
              path="/gardens/:gardenId"
              component={GardenShowPage}
            />
            <Route
              exact
              path="/login"
              render={() => (user ? <Redirect to="/" /> : <Login />)}
            />
            <Route
              exact
              path="/logout"
              render={() => (user ? <Logout /> : <Redirect to="/login" />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (user ? <Redirect to="/" /> : <Signup />)}
            />
          </Switch>
        </Router>
      )
    }
  </UserConsumer>
);

export default App;
