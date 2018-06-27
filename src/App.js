import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AuthButton, PrivateRoute } from "./router";
import { Login, Public, Protected } from "./pages";

const Nav = _ => (
  <nav className="Nav">
    <div className="links">
      <Link to="/public">Public Page</Link>
      <Link to="/protected">Protected Page</Link>
    </div>
    <AuthButton />
  </nav>
);
const App = () => (
  <Router>
    <div className="App-wrapper">
      <Nav />
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
);

export default App;
