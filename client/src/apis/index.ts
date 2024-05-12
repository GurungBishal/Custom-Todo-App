import axios from "../utils/axios";
import { IPagination, IResponse, ITodo } from "../types";
import { TodoStatus } from "../store/constants";

export async function fetchTodos(
  pagination: IPagination,
  status?: TodoStatus
): Promise<IResponse<{ todos: ITodo[] }>> {
  try {
    const todos = await axios.get(
      `/list?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}&status=${status}`
    );
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function fetchTodoDetail(
  todoId: string
): Promise<IResponse<{ todo: ITodo }>> {
  try {
    const todos = await axios.get(`/${todoId}`);
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateTodo(todoId: string, payload: Partial<ITodo>) {
  try {
    const todos = await axios.patch(`/update/${todoId}`, { ...payload });
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const todos = await axios.delete(`/delete/${todoId}`);
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function createTodo(payload: Partial<ITodo>) {
  try {
    const todos = await axios.post("/create", { ...payload });
    return todos.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
