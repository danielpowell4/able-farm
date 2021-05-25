import React from "react";
import { Field } from "formik";
import FormField from "./FormField";
import { titleize } from "../../lib/utils";

const Number = ({
  showLabel,
  hint,
  label,
  min = "0",
  name,
  placeholder,
  step = "0.01",
  ...props
}) => {
  const title = label || titleize(name);
  const placeholderText = placeholder || `${title}...`;

  return (
    <FormField
      showLabel={showLabel}
      hint={hint}
      label={title}
      name={name}
      type="number"
    >
      <Field
        className="field__input"
        id={name}
        name={name}
        placeholder={placeholderText}
        min={min}
        step={step}
        type="number"
        {...props}
      />
    </FormField>
  );
};

export default Number;
