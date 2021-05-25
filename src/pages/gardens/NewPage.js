import * as React from "react";
import { Formik } from "formik";
import {
  FormEl,
  Text,
  Number,
} from "../../components/formElements";
import { Layout } from "../../components";

import { useError } from "../../hooks";
import { UserContext } from "../../contexts/UserContext";

import { db } from "../../base";
import { redirectTo } from "../../lib/utils";

const NewGardenForm = ({
  // from Formik
  handleSubmit,
  isSubmitting,

  // from us
  errorMsg
}) => {
  return (
    <form onSubmit={handleSubmit} className="new-garden-form">
      <header className="new-garden-form__header">
        <h1 className="title">New Garden</h1>
      </header>
      <hr />
      {!!errorMsg && (
        <div>
          <h2>An error has occurred:</h2>
          <p style={{color: `var(--error)`}}>{errorMsg}</p>
        </div>
      )}
      <div className="new-garden-form__form-fields">
        <div
          className="grid-group"
        >
          <FormEl>
            <Text name="name" label="Garden Name" required />
          </FormEl>
          <FormEl>
            <Number
              name="width"
              min={1}
              max={12}
              step={1}
            />
          </FormEl>
          <FormEl>
            <Number
              name="height"
              min={1}
              max={12}
              step={1}
            />
          </FormEl>
        </div>
      </div>

      <hr />

      <div className="new-garden-form__actions">
        <button
          className="button"
          type="submit"
          disabled={isSubmitting}
        >{isSubmitting ? "..." : "Add Garden"}</button>
      </div>
    </form>
  );
};

const NewPageWrapper = () => {
  const [errorMsg, onError] = useError();
  const { user } = React.useContext(UserContext);

  return (
    <Layout>
      <Formik
        initialValues={{
          name: "",
          width: 8,
          height: 8,
          startingPlantName: "beets"
        }}
        onSubmit={async (values, actions) => {
          try {
            const gardenValues = {
              name: values.name,
              width: values.width,
              height: values.height,
              users: [user.uid],
            }
            const gardenDoc = await db.collection("gardens").add(gardenValues);
            await gardenDoc.collection("plants").add({ name: values.startingPlantName, positionX: 1, positionY: 1 })
            redirectTo(`/gardens/${gardenDoc.id}`)
          } catch (error) {
            const { status, errors } = error;

            if (status === 422) {
              actions.setErrors(errors);
            } else {
              onError(error);
            }

            actions.setSubmitting(false);
          }
        }}
      >
        {formikProps => <NewGardenForm errorMsg={errorMsg} {...formikProps} />}
      </Formik>
    </Layout>
  );
};

export default NewPageWrapper;
