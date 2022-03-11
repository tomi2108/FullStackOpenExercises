const Blog = require("../models/Blog");
const User = require("../models/User");
const blogRouter = require("express").Router();

const { tokenExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogRouter.post("/", tokenExtractor, async (request, response) => {
  const { title, url, author } = request.body;

  const decodedToken = request.token;
  const user = await User.findById(decodedToken.id);
  if (user) {
    const blog = new Blog({ title: title, url: url, author: author });
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(401).send({ error: "user not in database" });
  }
});

blogRouter.delete("/:id", tokenExtractor, async (request, response) => {
  const idToDelete = request.params.id;
  const blogToDelete = await Blog.findById(idToDelete);
  const userOfBlog = await User.findById(blogToDelete.author);
  const userOfBlogId = userOfBlog._id;
  console.log(userOfBlogId, "user of blog");

  const decodedToken = request.token;

  const userOfToken = await User.findById(decodedToken.id);
  const userOfTokenId = userOfToken._id;

  if (userOfTokenId.toString() === userOfBlogId.toString()) {
    await Blog.findByIdAndRemove(idToDelete);
    userOfBlog.blogs = userOfBlog.blogs.filter((objId) => objId.toString() !== idToDelete);
    await userOfBlog.save();
    return response.status(204).end();
  } else {
    return response.status(401).send({ error: "cant remove a blog from another user" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blogToUpdate = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true, context: "query" });
  response.json(updatedBlog);
});
module.exports = blogRouter;
