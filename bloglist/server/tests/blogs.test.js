const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
const User = require("../models/User");
const helper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});
  await helper.setRootUser();
  await Blog.deleteMany({});
  await helper.setInitialBlogs();
});
describe("blogsDb", () => {
  test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");
    const blogsAtStart = await helper.blogsInDb();
    expect(blogs.body).toHaveLength(blogsAtStart.length);
  });

  test("ids are defined as 'id'", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body[0].id).toBeDefined();
  });

  test("blog is posted correctly", async () => {
    const rootUser = await helper.getRootUser();
    const loginUser = { username: "root", password: "secretPassword" };
    const login = await api.post("/api/login").send(loginUser);

    const token = login.body.token;

    const newBlog = { title: "addedBlog", url: "smth" };
    const blogsAtStart = await helper.blogsInDb();
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    const blogTitles = blogsAtEnd.map((b) => b.title);
    expect(blogTitles).toContain("addedBlog");
  });

  test("blog is not posted without token and gives 401", async () => {
    const newBlog = { title: "addedBlog", url: "smth" };
    const blogsAtStart = await helper.blogsInDb();

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

    const blogTitles = blogsAtEnd.map((b) => b.title);
    expect(blogTitles).not.toContain("addedBlog");
  });

  test("if likes are not added it will default to 0", async () => {
    const loginUser = { username: "root", password: "secretPassword" };
    const login = await api.post("/api/login").send(loginUser);

    const token = login.body.token;

    const newBlog = { title: "likesBlog", url: "smthng" };
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    const postedBlog = blogsAtEnd.find((b) => b.title === "likesBlog");
    expect(postedBlog.likes).toBe(0);
  });

  test("if title or url are not defined respond with 400 Bad request", async () => {
    const rootUser = await helper.getRootUser();
    const loginUser = { username: "root", password: "secretPassword" };
    const login = await api.post("/api/login").send(loginUser);

    const token = login.body.token;

    const newBlog = { likes: 7, author: rootUser._id };
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(400);
    const newBlog2 = { title: "Hello", likes: 7, author: rootUser._id };
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog2)
      .expect(400);
    const newBlog3 = { url: "hii", likes: 7, author: rootUser._id };
    await api
      .post("/api/blogs")
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog3)
      .expect(400);
  });
  test("blog is deleted", async () => {
    const rootUser = await helper.getRootUser();
    const loginUser = { username: "root", password: "secretPassword" };
    const login = await api.post("/api/login").send(loginUser);

    const token = login.body.token;

    const blogsAtStart = await Blog.find({ author: rootUser._id });

    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const blogsAtEnd = await Blog.find({ author: rootUser._id });
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const blogTitles = blogsAtEnd.map((b) => b.title);
    expect(blogTitles).not.toContain(blogToDelete.title);
  });
  test("blog is updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const rootUser = await helper.getRootUser();

    const blogToUpdate = blogsAtStart[0];
    const idToUpdate = blogToUpdate.id;
    const newBlog = { author: rootUser._id, likes: 5, title: "updatedBlog", url: "updateddd" };

    await api.put(`/api/blogs/${idToUpdate}`).send(newBlog);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blogsAtEnd).toContainEqual({ id: idToUpdate, ...newBlog });
    expect(blogsAtEnd).not.toContainEqual(blogToUpdate);
  });
  test("user is not created with invalid details", async () => {
    const usersAtStart = await helper.usersInDb();
    const duplicatedUser = { username: "root", password: "anotherPass", name: "smth" };
    const newUser = { username: "a", password: "pass", name: "tomi" };

    await api.post("/api/users").send(duplicatedUser).expect(400).expect({ error: "username must be unique" });
    await api.post("/api/users").send(newUser).expect(400).expect({ error: "username and password do not meet requirements" });

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
