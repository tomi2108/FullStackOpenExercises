const Blog = require("../models/blog");
const initialBlogs = [
  { title: "a", url: "smth" },
  { title: "b", url: "smth" },
  { title: "c", url: "smth" },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
