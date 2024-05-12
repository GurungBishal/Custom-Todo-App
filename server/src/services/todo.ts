import { TodoStatus } from "../constants/commonEnum";
import { Todo } from "../models";
import { ITodo } from "../types";
import { IPagination } from "../types/pagination";

export default class TodoService {
  public createTodo = async (payload: ITodo) => {
    const todo = new Todo({ ...payload });

    return todo.save();
  };

  public listTodos = async (pagination: IPagination, status?: string) => {
    const { pageNumber, pageSize } = pagination;

    let query = {};

    if (status && status !== TodoStatus.none) {
      query = { status };
    }

    return Todo.find({ ...query })
      .limit(pageSize)
      .skip(pageNumber * pageSize)
      .sort({ createdtAt: -1 });
  };

  public getTodo = async (todoId: string) => {
    return Todo.findById(todoId);
  };

  public updateTodo = async (todoId: string, payload: ITodo) => {
    return Todo.updateOne({ _id: todoId }, { ...payload });
  };

  public deleteTodo = async (todoId: string) => {
    return Todo.deleteOne({ _id: todoId });
  };
}
