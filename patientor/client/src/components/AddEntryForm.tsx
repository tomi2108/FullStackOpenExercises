import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { EntryTypes, HealthCheckRating } from "../types";
import {
  healthCheckRatingOptions,
  SelectField,
  TextField,
  typeOptions,
} from "./EntryFormField";

export type EntryFormValues = {
  type: EntryTypes;
  id: string;
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  dischargeDate: string;
  dischargeCriteria: string;
  employerName: string;
  startDate: string;
  endDate: string;
};

const entryTypeOptions: typeOptions[] = [
  { value: EntryTypes.HealthCheck, label: "Health check" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const healthOptions: healthCheckRatingOptions[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  {
    value: HealthCheckRating.HighRisk,
    label: "High risk",
  },
  {
    value: HealthCheckRating.CriticalRisk,
    label: "Critical risk",
  },
];
interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        type: EntryTypes.HealthCheck,
        id: "",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        dischargeDate: "",
        dischargeCriteria: "",
        startDate: "",
        endDate: "",
        employerName: "",
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            <Field
              label="id"
              placeholder="id"
              name="id"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            {values.type === EntryTypes.Hospital ? (
              <>
                <Field
                  label="Discharge date"
                  placeholder="discharge date"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="discharge criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            ) : values.type === EntryTypes.OccupationalHealthcare ? (
              <>
                <Field
                  label="Employer name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start date"
                  placeholder="start date"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="End date"
                  placeholder="end date"
                  name="endDate"
                  component={TextField}
                />
              </>
            ) : (
              <SelectField
                label="HealthCare Rating"
                name="healthCheckRating"
                options={healthOptions}
              />
            )}
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

export default AddEntryForm;
