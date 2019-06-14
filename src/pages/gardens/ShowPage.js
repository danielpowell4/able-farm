import React, { useState } from "react";
import Garden from "../../components/Garden";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../base";
import enemies from "../../data/enemies";
import friends from "../../data/friends";

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
  const [activePlant, setActivePlant] = useState(null);

  const updatePlant = (id, traits) => {
    db.collection("gardens")
      .doc(gardenId)
      .collection("plants")
      .doc(id)
      .set(traits, { merge: true });
  };

  const movePlant = (id, positionX, positionY) => {
    updatePlant(id, { positionX, positionY });
  };

  if (!gardenSnapshot || !plantQuery) {
    return <p>Loading...</p>;
  }

  const garden = {
    id: gardenId,
    ...gardenSnapshot.data(),
  };
  const plants = plantQuery.docs.map(d => ({ id: d.id, ...d.data() }));

  return (
    <main>
      <header>
        <h1>{garden.name}</h1>
        {!!activePlant && (
          <details>
            <summary>
              <strong>Active Plant</strong> {activePlant.name}
            </summary>
            <ul>
              <li>
                <strong>Friends</strong> {friends[activePlant.name].join(", ")}
              </li>
              <li>
                <strong>Enemies</strong> {enemies[activePlant.name].join(", ")}
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
    </main>
  );
};

export default ShowPage;
