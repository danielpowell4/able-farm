import React from "react";

const FormEl = ({ children, ...rest }) => (
  <div style={{ margin: "0 0 1rem" }} {...rest}>
    {children}
  </div>
);

export default FormEl;
