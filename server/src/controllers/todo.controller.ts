import { Request, Response } from "express";

import { errorHandler, successHandler } from "../utils";
import { TodoService } from "../services";
import lang from "../constants/language";

export default class TodoController {
  public createTodo = async (req: Request, res: Response) => {
    try {
      const todoService = new TodoService();
      const todo = await todoService.createTodo(req.body);

      return successHandler(res, 200, lang.TODO_CREATED, {
        todo,
      });
    } catch (err) {
      if (err instanceof Error) {
        return errorHandler(res, 400, lang.TODO_CREATION_FAILED, {
          errorMessage: err.message,
        });
      }
    }
  };

  public getTodos = async (req: Request, res: Response) => {
    try {
      const { pageNumber, pageSize, status } = req.query;

      const todoService = new TodoService();

      const todos = await todoService.listTodos(
        {
          pageNumber: Number(pageNumber),
          pageSize: Number(pageSize),
        },
        status ? (status as string) : undefined
      );

      return successHandler(res, 200, lang.TODOS_FETCHED, {
        todos,
      });
    } catch (err) {
      if (err instanceof Error) {
        return errorHandler(res, 400, lang.TODO_FETCH_FAILED, {
          errorMessage: err.message,
        });
      }
    }
  };

  public getTodoDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const todoService = new TodoService();

      const todo = await todoService.getTodo(id);

      return successHandler(res, 200, lang.TODO_DETAIL_FETCHED, {
        todo,
      });
    } catch (err) {
      if (err instanceof Error) {
        return errorHandler(res, 400, lang.TODO_DETAIL_FETCH_ERROR, {
          errorMessage: err.message,
        });
      }
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updateTodoPayload = req.body;

      const todoService = new TodoService();

      await todoService.updateTodo(id, { ...updateTodoPayload });

      return successHandler(res, 200, lang.TODO_UPDATED, {});
    } catch (err) {
      if (err instanceof Error) {
        return errorHandler(res, 400, lang.TODO_UPDTAE_FAILED, {
          errorMessage: err.message,
        });
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const todoService = new TodoService();

      const todo = await todoService.deleteTodo(id);

      return successHandler(res, 200, lang.TODO_DELETED, {});
    } catch (err) {
      if (err instanceof Error) {
        return errorHandler(res, 400, lang.TODO_DELETION_FAILED, {
          errorMessage: err.message,
        });
      }
    }
  };
}
