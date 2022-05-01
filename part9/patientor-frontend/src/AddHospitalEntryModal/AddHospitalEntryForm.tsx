import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { DistributiveOmit, HospitalEntry } from "../types";
import { isDate, isString } from "../utils";

export type EntryWithoutId = DistributiveOmit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}


const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidError = "Invaild";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        } else if (!isString(values.description)) {
          errors.description = `${invalidError} description`;
        }

        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = `${invalidError} date`;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        } else if (!isString(values.specialist)) {
          errors.specialist = `${invalidError} specialist`;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              validate={(value: string) => {
                if (!value) {return 'Field is required';}
                else if (!isDate(value)) {return "Invalid date";}
              }}
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              validate={(value: string) => {
                if (!value) {return 'Field is required';}
                else if (!isDate(value)) {return "Invalid date";}
              }}
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

          </Form>
        );
      }}
  </Formik>
  );
};

export default AddHospitalEntryForm;