import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Layout } from "../components";
import homeStyles from "./Home.module.css";

import { db } from "../base";

const LoggedOutHome = (_) => (
  <section>
    <h1>Home</h1>
    <h3>You are not logged in.</h3>
    <p>Todo: insert marketing page.</p>
  </section>
);

const LoggedInHome = ({userId}) =>  {
  const [isLoadingGardens, setIsLoadingGardens] = React.useState(false);
  const [gardens, setGardens] = React.useState([]);

  React.useEffect(() => {
    setIsLoadingGardens(() => true);

    db.collection("gardens")
      .where("users", "array-contains", userId)
      .get()
      .then((snapshot) => {
        const gardens = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGardens(() => gardens);
        setIsLoadingGardens(() => false);
      });
  }, [userId])

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
        {isLoadingGardens ? (
          <p>Loading...</p>
        ) : gardens.length ? (
            <ul className={homeStyles.gardenList}>
              {gardens.map((garden) => (
                <li key={garden.id} className={homeStyles.gardenList__card}>
                  <Link to={`/gardens/${garden.id}`}>
                    <h3>{garden.name}</h3>
                    <p>{garden.height} x {garden.width} Plot</p>
                  </Link>
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
