import * as React from "react";
import enemies from "../data/enemies";
import friends from "../data/friends";
import Plant from "./Plant";

import { titleize } from "../lib/utils";

const PlantPicker = ({ activePlant, setActivePlant }) => {
  const activePlantFriends = friends[activePlant.name] || [];
  const activePlantEnemies = enemies[activePlant.name] || [];

  if (!activePlant) return null;

  return (
    <div className="activePlantContainer">
      <div className="activePlant">
        <strong>Active Plant</strong>{" "}
        {!!activePlant.name ? (
          <>
            <Plant
              name={activePlant.name}
              onClick={() => setActivePlant({ name: activePlant.name })}
            />
            <p>
              {titleize(activePlant.name)}
            </p>
            <button className="button" onClick={() => setActivePlant({})} style={{ marginLeft: "0.5rem", padding: ".5rem" }}>
              <span role="img" aria-label="Clear">
                🔄
              </span>
            </button>
          </>
        ) : (
          <select defaultValue="" onChange={event => setActivePlant({name: event.target.value})}>
            <option hidden>Choose...</option>
            {Object.keys(friends).map(plantName => <option key={plantName} value={plantName}>{titleize(plantName)}</option>)}
          </select>
        )}
      </div>
      <ul>
        <li className="activePlant__friends">
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
        <li className="activePlant__enemies">
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
    </div>
  );
};

export default PlantPicker;
