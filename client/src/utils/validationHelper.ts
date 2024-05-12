import * as Yup from "yup";
import { TodoStatus } from "../store/constants";

export const validateSchema = () => {
  return Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters long")
      .max(60, "Must be less than 60 characters"),
    description: Yup.string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters long")
      .max(250, "Must be less than 60 characters"),
    date: Yup.date().required("Date is required"),
    status: Yup.string().oneOf(
      [TodoStatus.pending, TodoStatus.completed],
      "Must be completed or pending"
    ),
  });
};
