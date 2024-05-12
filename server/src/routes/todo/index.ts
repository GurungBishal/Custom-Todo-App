import { Router } from "express";

import { ValidationMidleware } from "../../middlewares";
import {
  createTodoValidator,
  updateTodoValidatorr,
  validateDelete,
  validateFetchById,
  validateListTodos,
} from "../../validators";
import TodoController from "../../controllers/todo.controller";
import { AppApiRoutes } from "../../constants/commonEnum";

const router = Router();

const validationMiddleware = new ValidationMidleware();

const todoController = new TodoController();

router.post(
  AppApiRoutes.create,
  ...createTodoValidator,
  validationMiddleware.validation422Rules,
  todoController.createTodo
);

router.get(
  AppApiRoutes.list,
  ...validateListTodos,
  validationMiddleware.validation422Rules,
  todoController.getTodos
);

router.get(
  AppApiRoutes.detail,
  ...validateFetchById,
  validationMiddleware.validation422Rules,
  todoController.getTodoDetail
);

router.patch(
  AppApiRoutes.update,
  updateTodoValidatorr,
  validationMiddleware.validation422Rules,
  todoController.updateTodo
);

router.delete(
  AppApiRoutes.delete,
  ...validateDelete,
  validationMiddleware.validation422Rules,
  todoController.deleteTodo
);

export default router;
