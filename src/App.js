import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AuthButton, PrivateRoute } from "./router";
import { Login, Public, Protected } from "./pages";

const App = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
);

export default App;
