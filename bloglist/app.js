const express = require("express");
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = express();
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

logger.info("connecting to MongoDb");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error("error connecting to MongoDB:", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);

module.exports = app;
