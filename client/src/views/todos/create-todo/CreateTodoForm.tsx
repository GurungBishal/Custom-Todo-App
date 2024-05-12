import dayjs from "dayjs";
import { Grid, TextField, FormHelperText } from "@mui/material";

import { FormikErrors, FormikTouched } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";

import { getTime } from "../../../utils";
import { CreateTodo } from "../../../types";

interface ICreateTodoForm {
  values: Partial<CreateTodo>;
  touched: FormikTouched<Partial<CreateTodo>>;
  errors: FormikErrors<Partial<CreateTodo>>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  handleFieldValue: (key: string, value: any) => void;
}

const CreateTodoForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleFieldValue,
}: ICreateTodoForm) => {
  return (
    <>
      <Grid container direction={"column"} spacing={4}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="name"
            value={values.name ?? ""}
            onChange={handleChange}
            label="Name"
            onBlur={handleBlur}
            fullWidth
          />

          {touched.name && errors.name && (
            <FormHelperText error id="name-error">
              {errors.name}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="description"
            value={values.description ?? ""}
            onChange={handleChange}
            label="Description"
            onBlur={handleBlur}
            fullWidth
          />
          {touched.description && errors.description && (
            <FormHelperText error id="description-error">
              {errors.description}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
              label="Date"
              value={dayjs(values.date) ?? new Date()}
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },
              }}
              onChange={(newValue) => {
                handleFieldValue("date", newValue);
              }}
              disablePast
              name="date"
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Time"
                value={dayjs(getTime(values.time))}
                onChange={(newValue) => {
                  handleFieldValue("time", newValue);
                }}
                name="Time"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateTodoForm;
