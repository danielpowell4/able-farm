import React, { useState } from "react";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Garden from "../../components/Garden";
import Plant from "../../components/Plant";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../base";
import enemies from "../../data/enemies";
import friends from "../../data/friends";

import "./styles/ShowPage.scss";

const ShowPage = ({
  match: {
    params: { gardenId },
  },
}) => {
  const [gardenSnapshot] = useDocument(db.collection("gardens").doc(gardenId));
  const [plantQuery] = useCollection(
    db
      .collection("gardens")
      .doc(gardenId)
      .collection("plants")
  );
  const [activePlant, setActivePlant] = useState({});

  const updatePlant = (id, traits) => {
    db.collection("gardens")
      .doc(gardenId)
      .collection("plants")
      .doc(id)
      .set(traits, { merge: true });
  };

  const addPlant = traits => {
    db.collection("gardens")
      .doc(gardenId)
      .collection("plants")
      .doc()
      .set(traits, { merge: true });
  };

  const movePlant = (item, positionX, positionY) => {
    if (!!item.id) {
      updatePlant(item.id, { positionX, positionY });
    } else {
      addPlant({ name: item.name, positionX, positionY });
    }
  };

  if (!gardenSnapshot || !plantQuery) {
    return <p>Loading...</p>;
  }

  const garden = {
    id: gardenId,
    ...gardenSnapshot.data(),
  };
  const plants = plantQuery.docs.map(d => ({ id: d.id, ...d.data() }));

  const activePlantFriends = friends[activePlant.name] || [];
  const activePlantEnemies = enemies[activePlant.name] || [];

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <header>
          <h1>{garden.name}</h1>
          {!!activePlant && (
            <details>
              <summary>
                <strong>Active Plant</strong>{" "}
                {!!activePlant.name ? (
                  <>
                    <Plant
                      name={activePlant.name}
                      onClick={() => setActivePlant({ name: activePlant.name })}
                    />
                    <p>
                      {activePlant.name[0].toUpperCase() +
                        activePlant.name.substring(1)}
                    </p>
                  </>
                ) : (
                  <p>None</p>
                )}
              </summary>
              <ul>
                <li>
                  <strong>Friends</strong>{" "}
                  {activePlantFriends.length
                    ? activePlantFriends.map((name, i) => (
                        <Plant
                          key={i}
                          name={name}
                          onClick={() => setActivePlant({ name })}
                        />
                      ))
                    : "No Friends"}
                </li>
                <li>
                  <strong>Enemies</strong>{" "}
                  {activePlantEnemies.length
                    ? activePlantEnemies.map((name, i) => (
                        <Plant
                          key={i}
                          name={name}
                          onClick={() => setActivePlant({ name })}
                        />
                      ))
                    : "No Haters"}
                </li>
              </ul>
            </details>
          )}
        </header>

        <Garden
          height={garden.height}
          width={garden.width}
          plants={plants}
          movePlant={movePlant}
          setActivePlant={setActivePlant}
        />
      </DndProvider>
    </main>
  );
};

export default ShowPage;
