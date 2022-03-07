const Blog = require("../models/Blog");
const User = require("../models/User");
const blogRouter = require("express").Router();

const { tokenExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogRouter.post("/", tokenExtractor, async (request, response) => {
  const { title, url } = request.body;

  const decodedToken = request.token;
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ title: title, url: url, author: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", tokenExtractor, async (request, response) => {
  const idToDelete = request.params.id;
  const blogToDelete = await Blog.findById(idToDelete);
  const userOfBlog = await User.findById(blogToDelete.author);
  const userOfBlogId = userOfBlog._id.toString();

  const decodedToken = request.token;
  const userOfToken = await User.findById(decodedToken._id);
  const userOfTokenId = userOfToken._id.toString();

  if (userOfTokenId === userOfBlogId) {
    await Blog.findByIdAndRemove(idToDelete);
    userOfBlog.blogs = userOfBlog.blogs.filter((objId) => objId.toString() !== idToDelete);
    await userOfBlog.save();
    response.status(204).end();
  } else {
    response.status(401).send({ error: "cant remove a blog from another user" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blogToUpdate = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true, context: "query" });
  response.json(updatedBlog);
});
module.exports = blogRouter;
