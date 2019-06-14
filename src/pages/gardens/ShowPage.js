import React from "react";
import Garden from "../../components/Garden";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../base";

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
      </header>
      <Garden
        height={garden.height}
        width={garden.width}
        plants={plants}
        movePlant={movePlant}
      />
    </main>
  );
};

export default ShowPage;
