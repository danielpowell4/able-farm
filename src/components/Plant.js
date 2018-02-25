import React, { Component } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "./Constants";
import { DragSource } from "react-dnd";
import corn from "./images/corn.png";

const plantSource = {
  beginDrag(props) {
    return {
      id: props.id, // for dropping
      enemies: props.enemies, // for comparison
    };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class Plant extends Component {
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
        <span
          role="img"
          description="Plant emoji"
          aria-label="Drag plant to move"
        >
          🌱
        </span>
      </div>
    );
  }
}

Plant.propTypes = {
  id: PropTypes.number.isRequired,
  enemies: PropTypes.arrayOf(PropTypes.string).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.PLANT, plantSource, collect)(Plant);
