import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { DistributiveOmit, OccupationalHealthcareEntry } from "../types";
import { isDate, isString } from "../utils";

export type EntryWithoutId = DistributiveOmit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareEntryEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const invalidError = "Invalid";
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        } else if (!isString(values.employerName)) {
          errors.employerName = `${invalidError} employer name`;
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave Start Date"
              placeholder="Sickleave Start Date"
              name="sickLeave.startDate"
              validate={(value: string) => {
                if (!value) {return 'Field is required';}
                else if (!isDate(value)) {return "Invalid date";}
              }}
              component={TextField}
            />
            <Field
              label="Sickleave End Date"
              placeholder="Sickleave End Date"
              name="sickLeave.endDate"
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

export default AddOccupationalHealthcareEntryEntryForm;