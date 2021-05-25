import * as React from "react";
import { Formik } from "formik";
import {
  FormEl,
  Text,
  Number,
} from "../../components/formElements";
import { Layout, PlantPicker } from "../../components";

import { useError } from "../../hooks";
import { UserContext } from "../../contexts/UserContext";

import { db } from "../../base";
import { redirectTo } from "../../lib/utils";

import newPageStyles from "./styles/NewPage.module.css";

const NewGardenForm = ({
  // from Formik
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue,

  // from us
  errorMsg
}) => {
  return (
    <form onSubmit={handleSubmit} className={newPageStyles.form}>
      <header className={newPageStyles.form__header}>
        <h1 className="title">Add Garden</h1>
      </header>
      <hr />
      {!!errorMsg && (
        <div>
          <h2>An error has occurred:</h2>
          <p style={{color: `var(--error)`}}>{errorMsg}</p>
        </div>
      )}
      <div className={newPageStyles.form__fields}>
        <div
          className={newPageStyles.form__fields__gridGroup}
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
        <div className={newPageStyles.form__fields__gridGroup}>
          <h4 style={{ margin: ".5rem" }}>Pick First Plant</h4>
          <PlantPicker isDraggable={false} activePlant={{name: values.startingPlantName}} setActivePlant={plant => setFieldValue("startingPlantName", plant?.name)} />
        </div>
      </div>

      <hr />

      <div className={newPageStyles.form__actions}>
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
            if (!values.startingPlantName) {
              throw new Error("Starting plant required")
            }

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
