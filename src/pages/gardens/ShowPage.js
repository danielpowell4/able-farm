import React, { useState } from "react";

import { DndProvider, useDrop } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { Garden, PlantPicker, Layout } from "../../components";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../base";

import "./styles/ShowPage.css";

const Compost = ({ removePlant }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "plant",
    drop: item => {
      removePlant(item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="compost"
      style={{
        width: "100%",
        maxWidth: 480,
        margin: "auto",
        padding: `1.5rem 0`,
        background: "var(--accent)",
        opacity: isOver ? 0.8 : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ color: "#fff" }}>Compost Pile</p>
    </div>
  );
};

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

  const removePlant = item => {
    if (!!item.id) {
      db.collection("gardens")
        .doc(gardenId)
        .collection("plants")
        .doc(item.id)
        .delete();
    }
  };

  if (!gardenSnapshot || !plantQuery) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  const garden = {
    id: gardenId,
    ...gardenSnapshot.data(),
  };
  const plants = plantQuery.docs.map(d => ({ id: d.id, ...d.data() }));

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <main>
          <header>
            <h1>{garden.name}</h1>
            <PlantPicker activePlant={activePlant} setActivePlant={setActivePlant} />
          </header>
          <div className="gardenContainer">
            <Garden
              height={garden.height}
              width={garden.width}
              plants={plants}
              movePlant={movePlant}
              setActivePlant={setActivePlant}
            />

            <Compost removePlant={removePlant} />
          </div>
        </main>
      </DndProvider>
    </Layout>
  );
};

export default ShowPage;
