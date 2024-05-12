import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";

import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { fetchTodoDetail, updateTodo } from "../../../apis";
import Spinner from "../../../component/Spinner";
import { ITodo } from "../../../types";
import CustomSnackBar from "../../../component/Snackbar";
import { formatTodoPayload, getTime, validateSchema } from "../../../utils";

const TodoDetail = () => {
  const { id } = useParams();

  const [snackBarProps, setSnackBarProps] = useState({
    status: 200,
    message: "",
    open: false,
  });

  const handleSnackBarProps = (
    key: string,
    value: number | string | boolean
  ) => {
    setSnackBarProps((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMultipleProps = (status = 200, message = "", open = false) => {
    setSnackBarProps((prevState) => ({
      ...prevState,
      message,
      status,
      open,
    }));
  };

  const updateTodoMutation = useMutation({
    mutationFn: (payload: Partial<ITodo>) => {
      return updateTodo(id ? id : "", payload);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchTodoDetail"],
    queryFn: async () => {
      return fetchTodoDetail(id ? id : "");
    },
  });

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      ...data?.payload.todo,
    },
    onSubmit(values) {
      const updatePayload = formatTodoPayload(values as unknown as ITodo);

      updateTodoMutation
        .mutateAsync({ ...updatePayload })
        .then((data) => {
          handleMultipleProps(200, data.message, true);
        })
        .catch((err) => {
          handleMultipleProps(400, err.message, true);
        });
    },
    validationSchema: validateSchema(),
    enableReinitialize: true,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    handleMultipleProps(400, error.message, true);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "50px",
          marginTop: "50px",
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Typography variant="h5" mb={2}>
            Update Todo
          </Typography>
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
                    setFieldValue("date", newValue);
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
                      setFieldValue("time", newValue);
                    }}
                    name="Time"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="demo-simple-select"
                value={values.status ?? ""}
                label="Status"
                onChange={handleChange}
                name="status"
                select
                fullWidth
              >
                <MenuItem value={"completed"}>Done</MenuItem>
                <MenuItem value={"pending"}>Upcoming</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            type="submit"
            sx={{ float: "right", marginTop: "12px" }}
          >
            Update
          </Button>
        </form>
      </Box>

      <CustomSnackBar
        handleClose={() => handleSnackBarProps("open", false)}
        message={snackBarProps.message}
        open={snackBarProps.open}
        status={snackBarProps.status}
      />
    </>
  );
};

export default TodoDetail;
