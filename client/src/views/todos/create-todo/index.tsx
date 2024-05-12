import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";

import CreateTodoForm from "./CreateTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../../../apis";
import { ITodo } from "../../../types";
import { useState } from "react";
import CustomSnackBar from "../../../component/Snackbar";
import { useNavigate } from "react-router-dom";
import { formatTodoPayload, validateSchema } from "../../../utils";

const CreateTodo = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: (payload: Partial<ITodo>) => {
      return createTodo(payload);
    },
  });

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

  const {
    errors,
    handleSubmit,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    values,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: new Date(),
      time: new Date(),
    },
    onSubmit(values) {
      const createPayload = formatTodoPayload(
        values as unknown as Partial<ITodo>
      );
      createTodoMutation
        .mutateAsync({ ...createPayload })
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ["listTodos"] });
          handleMultipleProps(200, data.message, true);
          navigate("/todos");
        })
        .catch((err) => {
          handleMultipleProps(400, err.message, true);
        });
    },
    validationSchema: validateSchema(),
  });

  const handleFieldValue = (key: string, value: any) => {
    setFieldValue(key, value);
  };

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
            Create Todo
          </Typography>
          <CreateTodoForm
            {...{
              handleBlur,
              handleChange,
              errors,
              touched,
              handleFieldValue,
              values,
            }}
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{ float: "right", marginTop: "12px" }}
          >
            Create
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

export default CreateTodo;
