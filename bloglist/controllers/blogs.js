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

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blogToUpdate = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true, context: "query" });
  response.json(updatedBlog);
});
module.exports = blogRouter;
