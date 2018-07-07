import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import { AuthButton, PrivateRoute } from "./router";
import { Login, Signup, Home, Garden } from "./pages";

const Nav = _ => (
  <nav className="Nav">
    <div className="NavLinks">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/garden">Garden</NavLink>
    </div>
    <AuthButton />
  </nav>
);
const App = () => (
  <Router>
    <div className="App-wrapper">
      <Nav />
      <div className="App__body">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/garden" component={Garden} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
