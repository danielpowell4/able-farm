import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import { ItemTypes } from "./Constants";
import { DropTarget } from "react-dnd";

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

const squareTarget = {
  canDrop(props, monitor) {
    let { enemies } = monitor.getItem();
    return !props.hasPlant;
  },

  drop(props, monitor) {
    let { id } = monitor.getItem();
    props.movePlant(id, { x: props.x, y: props.y });
  },
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    activePlant: monitor.getItem(),
  };
};

class GardenSquare extends PureComponent {
  constructor(props) {
    super(props);

    this.overLayColors = {
      friend: "#5DA449",
      enemy: "#DF574F",
      notAllowed: "#F9433E",
      isOver: "#40BDFF",
    };
  }

  renderOverlay = (relation, strength = 160) => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "calc(100% - 2px)",
        width: "calc(100% - 2px)",
        zIndex: 1,
        opacity: strength / 200,
        backgroundColor: this.overLayColors[relation],
      }}
    />
  );

  render() {
    const {
      x,
      y,
      children,
      connectDropTarget,
      isOver,
      activePlant,
      canDrop,
      neighbors,
    } = this.props;

    return connectDropTarget(
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Square>{children}</Square>
        {isOver &&
          (canDrop
            ? this.renderOverlay("isOver")
            : this.renderOverlay("notAllowed"))}
        {!isOver &&
          (canDrop &&
            this.renderOverlay(
              "friend",
              getRating(neighbors, activePlant.friends)
            ))}
        {!isOver &&
          (canDrop &&
            this.renderOverlay(
              "enemy",
              getRating(neighbors, activePlant.enemies)
            ))}
      </div>
    );
  }
}

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
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.PLANT, squareTarget, collect)(GardenSquare);
