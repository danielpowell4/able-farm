import React from "react";
import FormError from "./FormError";

import "./styles/FormField.css";

const FormField = ({
  children,
  showLabel = true,
  hint,
  label,
  name,
  type,
}) => {
  return (
    <div className={`field field--${type}`}>
      {showLabel && (
        <label className="field__label" htmlFor={name}>
          {label}
        </label>
      )}
      {children}
      <FormError name={name} />
      {!!hint && (
        <small className="field__hint">
          {hint}
        </small>
      )}
    </div>
  );
};

export default FormField;
