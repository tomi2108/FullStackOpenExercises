const testRouter = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

testRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = testRouter;
