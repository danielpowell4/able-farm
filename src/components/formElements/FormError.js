import React from "react";
import { ErrorMessage } from "formik";
import "./styles/FormError.css";

const FormError = props => (
  <ErrorMessage {...props}>
    {msg => (
      <div className="FormError">
        {Array.isArray(msg) ? msg.join("; ") : msg}
      </div>
    )}
  </ErrorMessage>
);

export default FormError;
