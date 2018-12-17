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

class LoggedInHome extends Component {
  state = {
    gardens: [],
  };

  componentDidMount() {
    this.loadGardens();
  }

  loadGardens = () => {
    return GET("/gardens")
      .then(({ gardens }) => this.setState({ gardens }))
      .catch(err => console.log(err));
  };

  render() {
    const { gardens } = this.state;
    return (
      <section>
        <h1>Home</h1>
        <h3>You are logged in.</h3>
        <p>Todo: insert a dashboard.</p>
        <div>
          <h2>My Gardens</h2>
          <div>
            {gardens.length ? (
              gardens.map(({ id, name, population }, i) => (
                <div key={i}>
                  <p>Name: {name}</p>
                  <p>Population: {population}</p>
                  <Link to={`/gardens/${id}`}>Manage Plot</Link>
                </div>
              ))
            ) : (
              <p>
                No seeds started. <Link to="/gardens/new">Start A Garden</Link>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const Home = ({ authenticated, ...rest }) =>
  authenticated ? <LoggedInHome {...rest} /> : <LoggedOutHome />;

export default Home;
