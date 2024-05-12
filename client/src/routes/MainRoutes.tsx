import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const ListTodos = Loadable(lazy(() => import("../views/todos/index")));

const TodoDetail = Loadable(
  lazy(() => import("../views/todos/todo-detail/index"))
);

const CreateTodo = Loadable(
  lazy(() => import("../views/todos/create-todo/index"))
);

const NotFound = Loadable(lazy(() => import("../views/not-found/index")));

const MainRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <ListTodos />,
  },
  {
    path: "/todos/:id",
    element: <TodoDetail />,
  },
  {
    path: "/todos/single",
    element: <CreateTodo />,
  },
];

export default MainRoutes;
