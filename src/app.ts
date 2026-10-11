
import express from "express";
import router from "./routes/index.js";
import { errorHandler } from "./errors/error-handler.js";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

export default app;
