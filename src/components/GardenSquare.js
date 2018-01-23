import React, { Component } from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import { ItemTypes } from "./Constants";
import { DropTarget } from "react-dnd";

const squareTarget = {
  canDrop(props) {
    return true;
  },

  drop(props) {
    props.movePlant(props.x, props.y);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class GardenSquare extends Component {
  renderOverlay(color) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    );
  }

  render() {
    const { handleSquareClick, x, y, children } = this.props;
    const dark = (x + y) % 2 === 1;

    return (
      <Square dark={dark} handleSquareClick={handleSquareClick}>
        {children}
      </Square>
    );
  }
}

GardenSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.PLANT, squareTarget, collect)(GardenSquare);
