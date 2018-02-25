import React, { Component } from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import { ItemTypes } from "./Constants";
import { DropTarget } from "react-dnd";

const hasEnemies = (neighbors, enemies) => {
  return !!neighbors.filter(x => enemies.includes(x)).length;
};

const squareTarget = {
  canDrop(props, monitor) {
    let { enemies } = monitor.getItem();
    return !props.hasPlant && !hasEnemies(props.neighbors, enemies);
  },

  drop(props, monitor) {
    let { id } = monitor.getItem();
    props.movePlant(id, { x: props.x, y: props.y });
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

class GardenSquare extends Component {
  constructor(props) {
    super(props);

    this.overLayColors = {
      friend: "#25C183",
      neutral: "#B5EBB1",
      enemy: "#DF574F",
    };
  }

  renderOverlay = relation => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.8,
        backgroundColor: this.overLayColors[relation],
      }}
    />
  );

  render() {
    const { x, y, children, connectDropTarget, isOver, canDrop } = this.props;
    const dark = (x + y) % 2 === 1;

    return connectDropTarget(
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Square dark={dark}>{children}</Square>
        {isOver && canDrop && this.renderOverlay("friend")}
        {!isOver && canDrop && this.renderOverlay("neutral")}
        {isOver && !canDrop && this.renderOverlay("enemy")}
      </div>
    );
  }
}

GardenSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  hasPlant: PropTypes.bool.isRequired,
  neighbors: PropTypes.arrayOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.PLANT, squareTarget, collect)(GardenSquare);
