const Blog = require("../models/Blog");
const User = require("../models/User");
const blogRouter = require("express").Router();

const { tokenExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogRouter.get("/get/:username", async (request, response) => {
  const user = await User.findOne({ username: request.params.username });
  const userId = user._id;
  const blogs = await Blog.find({ userId: userId });
  response.status(200).json(blogs);
});

blogRouter.post("/", tokenExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body;

  const decodedToken = request.token;
  const user = await User.findById(decodedToken.id);

  if (user) {
    const blog = new Blog({ title: title, url: url, author: author, likes: likes ?? 0, userId: user._id.toString() });
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(401).send({ error: "user not in database" });
  }
});

blogRouter.delete("/:id", tokenExtractor, async (request, response) => {
  const idToDelete = request.params.id;

  const decodedToken = request.token;

  if (decodedToken.id) {
    await Blog.findByIdAndRemove(idToDelete);
    return response.status(204).end();
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blogToUpdate = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true, context: "query" });
  response.json(updatedBlog);
});

module.exports = blogRouter;
