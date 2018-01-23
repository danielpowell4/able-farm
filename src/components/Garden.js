import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GardenSquare from "./GardenSquare";
import Plant from "./Plant";
import { movePlant } from "../modules/garden/actions";

class Garden extends Component {
  static propTypes = {
    plantPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  };

  renderSquare = i => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
        <GardenSquare
          x={x}
          y={y}
          movePlant={this.props.movePlant.bind(null, { x, y })}
        >
          {this.renderPlant(x, y)}
        </GardenSquare>
      </div>
    );
  };

  renderPlant = (x, y) => {
    const { x: plantX, y: plantY } = this.props.plantPosition;
    if (x === plantX && y === plantY) {
      return <Plant />;
    }
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

const mapStateToProps = ({ garden: { position: plantPosition } }) => ({
  plantPosition,
});

const mapDispatchToProps = dispatch => ({
  movePlant: position => dispatch(movePlant(position)),
});

Garden = DragDropContext(HTML5Backend)(Garden);
export default connect(mapStateToProps, mapDispatchToProps)(Garden);
