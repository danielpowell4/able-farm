import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserConsumer, UserContext } from "../contexts/UserContext";

import { db } from "../base";

const LoggedOutHome = _ => (
  <section>
    <h1>Home</h1>
    <h3>You are not logged in.</h3>
    <p>Todo: insert marketing page.</p>
  </section>
);

class LoggedInHome extends Component {
  static contextType = UserContext;

  state = {
    isLoadingGardens: false,
    gardens: [],
  };

  componentDidMount() {
    this.loadGardens();
  }

  loadGardens = () => {
    this.setState({ isLoadingGardens: true });

    db.collection("gardens")
      .where("users", "array-contains", this.props.userId)
      .get()
      .then(snapshot => {
        const gardens = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.setState({ isLoadingGardens: false, gardens });
      });
  };

  render() {
    const { gardens } = this.state;
    const { onLogout } = this.context;

    return (
      <section>
        <h1>Home</h1>
        <button onClick={onLogout}>Logout</button>
        <h3>You are logged in.</h3>
        <p>Todo: insert a dashboard.</p>
        <div>
          <h2>My Gardens</h2>
          <div>
            {gardens.length ? (
              gardens.map(({ id, name }, i) => (
                <div key={i}>
                  <p>Name: {name}</p>
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

const Home = _ => (
  <UserConsumer>
    {({ user }) =>
      user ? <LoggedInHome userId={user.uid} /> : <LoggedOutHome />
    }
  </UserConsumer>
);

export default Home;
