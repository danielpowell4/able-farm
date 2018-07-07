import React from "react";
import { Auth } from "../router/utils";

const LoggedOutHome = _ => (
  <section>
    <h1>Home</h1>
    <h3>You are not logged in.</h3>
    <p>Todo: insert marketing page.</p>
  </section>
);
const LoggedInHome = _ => (
  <section>
    <h1>Home</h1>
    <h3>You are logged in.</h3>
    <p>Todo: insert a dashboard.</p>
  </section>
);

const Home = _ =>
  Auth.isAuthenticated() ? <LoggedInHome /> : <LoggedOutHome />;

export default Home;
