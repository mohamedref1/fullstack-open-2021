import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, SelectField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { DistributiveOmit, HealthCheckEntry, HealthCheckRating } from "../types";
import { isDate, isHealthCheckRating, isString } from "../utils";

export type EntryWithoutId = DistributiveOmit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

export interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions = [
  { value: HealthCheckRating.LOW_RISK, label: "Low Risk" },
  { value: HealthCheckRating.HIGH_RISK, label: "High Risk" },
  { value: HealthCheckRating.CRITICAL_RISK, label: "Critical Risk" },
  { value: HealthCheckRating.HEALTHY, label: "Healthy" },
];


const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
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
        
        if(values.healthCheckRating === undefined) {
            errors.healthCheckRating = requiredError;
        } else if (!isHealthCheckRating(values.healthCheckRating)) {
          errors.healthCheckRating = `${invalidError} health check care`;
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
            <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
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

export default AddHealthCheckEntryForm;