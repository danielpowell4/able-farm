import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GardenSquare from "./GardenSquare";
import Knight from "./Knight";
import { canMoveKnight, moveKnight } from "./Game";

class Garden extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
        <GardenSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </GardenSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  handleSquareClick(toX, toY) {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div
        style={{
          height: 560,
          width: 560,
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid gray",
          marginTop: "3rem",
        }}
      >
        {squares}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Garden);
