import express from "express";
import todoRoutes from "./todo/index";
import { AppApiRoutes } from "../constants/commonEnum";

const app = express();

app.use(AppApiRoutes.todo, todoRoutes);

export default app;
