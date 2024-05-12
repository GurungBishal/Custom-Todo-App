import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index";
import { AppApiRoutes } from "./constants/commonEnum";
import { connect } from "./database";

const app: express.Application = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3333;

app.use(AppApiRoutes.default, routes);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  connect();
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);
