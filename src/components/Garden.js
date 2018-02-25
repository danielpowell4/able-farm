import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GardenSquare from "./GardenSquare";
import Plant from "./Plant";
import { movePlant } from "../modules/plants/actions";

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
    return this.props.plants.find(
      p => x === p.position.x && y === p.position.y
    );
  };

  gatherNeighbors = (x, y) => {
    let neighbors = [];
    for (
      let i = Math.max(1, x - 1);
      i <= Math.min(x + 1, this.props.width);
      i++
    ) {
      for (
        let j = Math.max(1, y - 1);
        j <= Math.min(y + 1, this.props.height);
        j++
      ) {
        if (x !== i || y !== j) {
          let p = this.findPlantByPosition(i, j);
          if (!!p) neighbors.push(p.name);
        }
      }
    }
    return neighbors;
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
          marginTop: "3rem",
        }}
      >
        {squares}
      </div>
    );
  }
}

const mapStateToProps = ({ plants: { byId: plantsById, allPlants } }) => ({
  plants: allPlants.map(p => plantsById[p]),
});

const mapDispatchToProps = dispatch => ({
  movePlant: (id, position) => dispatch(movePlant(id, position)),
});

Garden = DragDropContext(HTML5Backend)(Garden);
export default connect(mapStateToProps, mapDispatchToProps)(Garden);
