import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import { AuthButton, PrivateRoute } from "./lib";
import { Login, Signup, Home, GardenNewPage, GardenShowPage } from "./pages";

const Nav = _ => (
  <nav className="Nav">
    <div className="NavLinks">
      <NavLink to="/">Home</NavLink>
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
          <PrivateRoute exact path="/gardens/new" component={GardenNewPage} />
          <PrivateRoute
            exact
            path="/gardens/:garden_id"
            component={GardenShowPage}
          />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
