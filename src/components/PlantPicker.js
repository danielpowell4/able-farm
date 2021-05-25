import * as React from "react";
import enemies from "../data/enemies";
import friends from "../data/friends";
import Plant from "./Plant";

import { titleize } from "../lib/utils";

import plantPickerStyles from "./PlantPicker.module.css";

const PlantPicker = ({ activePlant, setActivePlant, isDraggable = true }) => {
  const activePlantFriends = friends[activePlant.name] || [];
  const activePlantEnemies = enemies[activePlant.name] || [];

  if (!activePlant) return null;

  return (
    <div className={plantPickerStyles.activePlantContainer}>
      <div className={plantPickerStyles.activePlant}>
        <strong>Active Plant</strong>{" "}
        {!!activePlant.name ? (
          <>
            <Plant
              name={activePlant.name}
              onClick={() => setActivePlant({ name: activePlant.name })}
              isDraggable={isDraggable}
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
                  isDraggable={isDraggable}
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
                  isDraggable={isDraggable}
                />
              ))
            : "No Haters"}
        </li>
      </ul>
    </div>
  );
};

export default PlantPicker;
