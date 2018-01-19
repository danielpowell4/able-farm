import React, { Component } from "react";
import PropTypes from "prop-types";

class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? "black" : "white";
    const stroke = black ? "white" : "black";

    return (
      <div
        style={{
          position: "relative",
          backgroundColor: fill,
          color: stroke,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool,
};

export default Square;
