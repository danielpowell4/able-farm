import React from "react";
import { Field } from "formik";
import FormField from "./FormField";
import { titleize } from "../../lib/utils";

const Text = ({
  hideLabel,
  hint,
  label,
  name,
  placeholder,
  ...props
}) => {
  const title = label || titleize(name);
  const placeholderText = placeholder || `${title}...`;

  return (
      <FormField
        hideLabel={hideLabel}
        hint={hint}
        label={title}
        name={name}
        type="text"
      >
        <Field
          className="field__input field__input--text"
          name={name}
          id={name}
          type="text"
          placeholder={placeholderText}
          {...props}
        />
      </FormField>
  );
};


export default Text;
