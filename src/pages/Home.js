import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Layout } from "../components";
import homeStyles from "./Home.module.css";

import { db } from "../base";

import { useCollection } from "react-firebase-hooks/firestore";

const LoggedOutHome = (_) => (
  <section>
    <h1>Home</h1>
    <h3>You are not logged in.</h3>
    <p>Todo: insert marketing page.</p>
  </section>
);

const LoggedInHome = ({ userId }) =>  {
  const [gardensQuery] = useCollection(
    db.collection("gardens")
      .where("users", "array-contains", userId)
  );

  const deleteGarden = gardenId => {
    if (window.confirm("Are you really sure you want to remove this garden? This action is permanent and irreversible.")) {
      db.collection("gardens")
        .doc(gardenId)
        .delete();
    }
  };

  const gardens = gardensQuery?.docs?.map(d => ({ id: d.id, ...d.data() })) || [];

  return (
    <Layout>
      <h1>
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
        Welcome Back!
      </h1>
      <section>
        <header className={homeStyles.sectionHeader}>
          <h2>Gardens</h2>
          <Link to={`/gardens/new`} className={"link-button"}>Add +</Link>
        </header>
        {!gardensQuery ? (
          <p>Loading...</p>
        ) : gardens.length ? (
            <ul className={homeStyles.gardenList}>
              {gardens.map((garden) => (
                <li key={garden.id} className={homeStyles.gardenList__card}>
                  <Link to={`/gardens/${garden.id}`}>
                    <h3>{garden.name}</h3>
                    <p>{garden.height} x {garden.width} Plot</p>
                  </Link>
                  <ul className={homeStyles.gardenList__card__actions}>
                    <li><Link to={`/gardens/${garden.id}/edit`} className="link-button"><span role="img" aria-label="Edit">🖍</span> Edit</Link></li>
                    <li><button className="button" onClick={() => deleteGarden(garden.id)}><span role="img" aria-label="Remove">🌋</span> Remove</button></li>
                  </ul>
                </li>
              ))}
            </ul>
            ) : (
              <p>
                No seeds started.{" "}
                <Link to="/gardens/new">Start A Garden</Link>
              </p>
            )}
      </section>
    </Layout>
  );
}

const Home = (_) => {
  const { user } = React.useContext(UserContext);

  if (!user) return <LoggedOutHome />;

  return <LoggedInHome userId={user.uid} />
}

export default Home;
