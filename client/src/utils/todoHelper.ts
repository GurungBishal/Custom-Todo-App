import dayjs from "dayjs";
import { ITodo } from "../types";

export const formatTodoPayload = (todo: Partial<ITodo>) => {
  let { time, ...rest } = todo;

  if (typeof time !== "string") {
    time = dayjs(time).format("LT");
  }

  return {
    ...rest,
    time,
  };
};
