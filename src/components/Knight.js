import React, { Component } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "./Constants";
import { DragSource } from "react-dnd";
import corn from "./images/corn.png";

const knightSource = {
  beginDrag(props) {
    return {};
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class Knight extends Component {
  componentDidMount() {
    const img = new Image();
    img.src = corn;
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 40,
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        🌱
      </div>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
