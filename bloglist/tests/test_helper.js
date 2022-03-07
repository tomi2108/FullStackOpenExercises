const bcrypt = require("bcrypt");
const Blog = require("../models/Blog");
const User = require("../models/User");

const initialBlogs = [
  { title: "a", url: "smth" },
  { title: "b", url: "smth" },
  { title: "c", url: "smth" },
];

const setRootUser = async () => {
  const passwordHash = await bcrypt.hash("secretPassword", 10);
  const rootUser = { name: "admin", username: "root", passwordHash: passwordHash, blogs: [] };
  const user = new User(rootUser);
  await user.save();
};
const getRootUser = async () => {
  const user = await User.findOne({ username: "root" });
  return user;
};

const setInitialBlogs = async () => {
  const rootUser = await getRootUser();
  initialBlogs.forEach((blog) => (blog.author = rootUser._id));
  const blogsObjects = initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogsObjects.map((obj) => obj.save());
  await Promise.all(promiseArray);

  const blogs = await Blog.find({});
  const blogsId = blogs.map((b) => b._id);
  rootUser.blogs = blogsId;
  await rootUser.save();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { getRootUser, setRootUser, setInitialBlogs, blogsInDb, usersInDb };
