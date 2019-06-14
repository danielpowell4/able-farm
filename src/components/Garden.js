import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GardenSquare from "./GardenSquare";
import Plant from "./Plant";

class Garden extends Component {
  constructor(props) {
    super(props);

    this.squareWidth = `${100 / props.width}%`;
    this.squareHeight = `${100 / props.height}%`;
  }

  static propTypes = {
    plants: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
  static defaultProps = {
    width: 8,
    height: 8,
  };

  findPlantByPosition = (x, y) => {
    return this.props.plants.find(p => x === p.positionX && y === p.positionY);
  };

  gatherNeighbors = (x, y) => {
    let neighbors = [];
    for (
      let i = Math.max(1, x - 3);
      i <= Math.min(x + 3, this.props.width);
      i++
    ) {
      for (
        let j = Math.max(1, y - 3);
        j <= Math.min(y + 3, this.props.height);
        j++
      ) {
        if (x !== i || y !== j) {
          let p = this.findPlantByPosition(i, j);
          if (!!p)
            neighbors.push({
              name: p.name,
              distance: this.getDistance(x, y, i, j),
            });
        }
      }
    }
    return neighbors;
  };

  getDistance = (x1, y1, x2, y2) => {
    const s1 = Math.abs(x2 - x1);
    const s2 = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(s1, 2) + Math.pow(s2, 2));
  };

  renderSquare = (x, y) => {
    const plant = this.findPlantByPosition(x, y);
    const neighbors = this.gatherNeighbors(x, y);

    return (
      <div
        key={`${x}:${y}`}
        style={{ width: this.squareWidth, height: this.squareHeight }}
      >
        <GardenSquare
          x={x}
          y={y}
          hasPlant={!!plant}
          movePlant={this.props.movePlant}
          neighbors={neighbors}
        >
          {!!plant && <Plant {...plant} />}
        </GardenSquare>
      </div>
    );
  };

  render() {
    const { width, height } = this.props;
    const squares = [];

    for (let x = 1; x <= height; x++) {
      for (let y = 1; y <= width; y++) {
        squares.push(this.renderSquare(x, y));
      }
    }

    return (
      <div
        style={{
          height: 560,
          width: 560,
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid gray",
          margin: "1rem auto",
        }}
      >
        {squares}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Garden);
