export enum AppApiRoutes {
  default = "/api",
  todo = "/todo",
  create = "/create",
  list = "/list",
  detail = "/:id",
  update = "/update/:id",
  delete = "/delete/:id",
}

export enum TodoStatus {
  completed = "completed",
  pending = "pending",
  none = "none",
}
