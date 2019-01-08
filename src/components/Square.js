import React, { Component } from "react";

class Square extends Component {
  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          position: "relative",
          boxShadow: "-2px -2px 0 #665235",
          backgroundColor: "#836B32",
          backgroundImage: "url(http://cssgridgarden.com//images/dirt.svg)",
          backgroundSize: "calc(100% - 4px)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    );
  }
}

export default Square;
