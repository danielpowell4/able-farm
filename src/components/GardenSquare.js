import React from "react";
import PropTypes from "prop-types";

import { useDrop } from "react-dnd";
import Square from "./Square";
import { ItemTypes } from "./Constants";

const getRating = (neighbors, setB) => {
  let relationPoints = 0;
  let distPoints = 0;

  neighbors.forEach(({ name, distance }) => {
    if (setB.includes(name)) {
      relationPoints += 25;
      distPoints += 200 / (distance * 2);
    }
  });

  return relationPoints + distPoints;
};

const overLayColors = {
  friend: "#5DA449",
  enemy: "#DF574F",
  notAllowed: "#F9433E",
  isOver: "#40BDFF",
};

const Overlay = ({ relation, strength }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "calc(100% - 2px)",
        width: "calc(100% - 2px)",
        zIndex: 1,
        opacity: strength / 200,
        backgroundColor: overLayColors[relation],
      }}
    />
  );
};

Overlay.defaultProps = {
  strength: 160,
};

const GardenSquare = ({ x, y, movePlant, hasPlant, neighbors, children }) => {
  const [{ isOver, canDrop, activePlant }, drop] = useDrop({
    accept: ItemTypes.PLANT,
    canDrop: () => !hasPlant,
    drop: item => {
      movePlant(item, x, y);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      activePlant: monitor.getItem(),
    }),
  });

  const friends = (!!activePlant && activePlant.friends) || [];
  const enemies = (!!activePlant && activePlant.enemies) || [];

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square>{children}</Square>
      {isOver &&
        (canDrop ? (
          <Overlay relation="isOver" />
        ) : (
          <Overlay relation="notAllowed" />
        ))}
      {!isOver &&
        (canDrop && (
          <Overlay relation="friend" strength={getRating(neighbors, friends)} />
        ))}
      {!isOver &&
        (canDrop && (
          <Overlay relation="enemy" strength={getRating(neighbors, enemies)} />
        ))}
    </div>
  );
};

GardenSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hasPlant: PropTypes.bool.isRequired,
  neighbors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      distance: PropTypes.number,
    })
  ).isRequired,
};

export default GardenSquare;
