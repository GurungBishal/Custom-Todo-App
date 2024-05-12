export interface ITodo {
  _id: string;
  name: string;
  description: string;
  date: Date;
  time: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export type CreateTodo = Pick<ITodo, "name" | "description" | "date"> & {
  time: Date;
};
