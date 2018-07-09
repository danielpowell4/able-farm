import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Auth, GET } from "../lib/utils";

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
