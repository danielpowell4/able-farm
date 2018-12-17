import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { PrivateRoute } from "./lib";

import app, { db } from "./base";

import {
  LogIn,
  LogOut,
  SignUp,
  Home,
  GardenNewPage,
  GardenShowPage,
} from "./pages";

// TODO: Loader fancy
const Loader = _ => <p>Loading...</p>;
class App extends Component {
  state = { loading: true, authenticated: false, currentUser: null };

  componentDidMount() {
    this.subscribeToAuthState();
  }

  subscribeToAuthState = () => {
    app.auth().onAuthStateChanged(this.handleAuthChange);
  };

  getUser = uid => {
    return db
      .collection("users")
      .doc(uid)
      .get()
      .then(snapshot => {
        this.setState({
          authenticated: true,
          currentUser: snapshot.data(),
          loading: false,
        });
      });
  };

  handleAuthChange = authUser => {
    if (authUser) {
      this.getUser(authUser.uid);
    } else {
      this.setState({
        authenticated: false,
        currentUser: null,
        loading: false,
      });
    }
  };

  render() {
    const { authenticated, loading, currentUser } = this.state;
    const { uid: userId, name, email } = authenticated
      ? currentUser
      : { uid: null, name: null, email: "" };

    if (loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    return (
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            authenticated={authenticated}
            userId={userId}
            name={name}
            email={email}
          />
          <PrivateRoute
            exact
            path="/gardens/new"
            component={GardenNewPage}
            authenticated={authenticated}
          />
          <PrivateRoute
            exact
            path="/gardens/:garden_id"
            component={GardenShowPage}
            authenticated={authenticated}
          />
          <Route
            exact
            path="/login"
            render={() => (authenticated ? <Redirect to="/" /> : <LogIn />)}
          />
          <Route exact path="/logout" render={LogOut} />
          <Route
            exact
            path="/signup"
            render={() => (authenticated ? <Redirect to="/" /> : <SignUp />)}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
