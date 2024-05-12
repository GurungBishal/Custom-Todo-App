import { body, query, param } from "express-validator";
import { checkIfPastDate } from "../utils/dateHelper";
import { TodoStatus } from "../constants/commonEnum";

export const createTodoValidator = [
  body("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 60 })
    .withMessage("Name must be between 3 and 60 characters in length"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required")
    .isLength({ min: 3, max: 250 })
    .withMessage("Description must be between 3 and 250 characters in length"),
  body("date")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("Date is required")
    .custom((value) => {
      if (checkIfPastDate(value)) {
        throw new Error("Past date cannot be selected");
      }
      return true;
    }),
  body("time").notEmpty().isString().withMessage("Time is required"),
];

export const updateTodoValidatorr = [
  ...createTodoValidator,
  body("status")
    .notEmpty()
    .isIn([TodoStatus.completed, TodoStatus.pending])
    .withMessage("Time is required"),
];

export const validateListTodos = [
  query("pageNumber").isString().withMessage("Page Number must be string"),
  query("pageSize").isString().withMessage("Page Size must be string"),
];

export const validateDelete = [
  param("id").isString().isMongoId().withMessage("Id must be a valid"),
];

export const validateFetchById = [...validateDelete];
