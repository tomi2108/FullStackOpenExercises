const express = require("express");
const Blog = require("../models/blog");
const blogRouter = express.Router();
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});
module.exports = blogRouter;
