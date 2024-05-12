import { model, Schema } from "mongoose";
import { ITodo } from "../types";
import { TodoStatus } from "../constants/commonEnum";

const TodoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [TodoStatus.pending, TodoStatus.completed],
      required: true,
      default: TodoStatus.pending,
    },
  },
  {
    timestamps: true,
    collection: "todos",
  }
);

export const Todo = model<ITodo>("Todo", TodoSchema);
