import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GardenSquare from "./GardenSquare";
import Plant from "./Plant";
import { movePlant } from "../modules/plants/actions";

class Garden extends Component {
  static propTypes = {
    plants: PropTypes.array,
  };

  findPlantByPosition = (x, y) => {
    return this.props.plants.find(
      p => x === p.position.x && y === p.position.y
    );
  };

  renderSquare = i => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const plant = this.findPlantByPosition(x, y);

    return (
      <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
        <GardenSquare
          x={x}
          y={y}
          hasPlant={!!plant}
          movePlant={this.props.movePlant}
        >
          {!!plant && <Plant {...plant} />}
        </GardenSquare>
      </div>
    );
  };

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

const mapStateToProps = ({ plants: { byId: plantsById, allPlants } }) => ({
  plants: allPlants.map(p => plantsById[p]),
});

const mapDispatchToProps = dispatch => ({
  movePlant: (id, position) => dispatch(movePlant(id, position)),
});

Garden = DragDropContext(HTML5Backend)(Garden);
export default connect(mapStateToProps, mapDispatchToProps)(Garden);
