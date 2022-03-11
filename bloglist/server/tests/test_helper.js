const bcrypt = require("bcrypt");
const Blog = require("../models/Blog");
const User = require("../models/User");

const initialBlogs = [
  { title: "a", url: "smth", author: "tomi sanchez" },
  { title: "b", url: "smth", author: "tomi sanchez" },
  { title: "c", url: "smth", author: "tomi sanchez" },
];

const setRootUser = async () => {
  const passwordHash = await bcrypt.hash("secretPassword", 10);
  const rootUser = { name: "admin", username: "root", passwordHash: passwordHash };
  const user = new User(rootUser);
  await user.save();
};
const getRootUser = async () => {
  const user = await User.findOne({ username: "root" });
  return user;
};

const setInitialBlogs = async () => {
  const blogsObjects = initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogsObjects.map((obj) => obj.save());
  await Promise.all(promiseArray);
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
