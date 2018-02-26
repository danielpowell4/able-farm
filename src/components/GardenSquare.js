import React, { Component } from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import { ItemTypes } from "./Constants";
import { DropTarget } from "react-dnd";

const hasOverlap = (setA, setB) => {
  return !!setA.filter(x => setB.includes(x)).length;
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

class GardenSquare extends Component {
  constructor(props) {
    super(props);

    this.overLayColors = {
      friend: "#25C183",
      neutral: "#B5EBB1",
      enemy: "#DF574F",
      notAllowed: "#F9433E",
      isOver: "#40BDFF",
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
    const dark = (x + y) % 2 === 1;
    let encouragePlacement = !!activePlant
      ? hasOverlap(neighbors.map(n => n.name), activePlant.friends)
      : false;
    let discouragePlacement = !!activePlant
      ? hasOverlap(neighbors.map(n => n.name), activePlant.enemies)
      : false;

    return connectDropTarget(
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Square dark={dark}>{children}</Square>
        {isOver &&
          (canDrop
            ? this.renderOverlay("isOver")
            : this.renderOverlay("notAllowed"))}
        {!isOver &&
          (canDrop &&
            (encouragePlacement
              ? this.renderOverlay("friend")
              : this.renderOverlay("neutral")))}
        {!isOver && discouragePlacement && this.renderOverlay("enemy")}
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
