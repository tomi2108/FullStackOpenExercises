const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = express();
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

logger.info("connecting to MongoDb");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error("error connecting to MongoDB:", err.message));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
