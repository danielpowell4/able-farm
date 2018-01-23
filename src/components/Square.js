import React, { Component } from "react";
import PropTypes from "prop-types";

class Square extends Component {
  static propTypes = {
    dark: PropTypes.bool,
  };

  render() {
    const { dark } = this.props;
    const fill = dark ? "#784631" : "#a15e39";
    const stroke = dark ? "#5f831e" : "#97be30";

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

export default Square;
