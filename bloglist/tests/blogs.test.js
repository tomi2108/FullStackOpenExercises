const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((obj) => obj.save());
  await Promise.all(promiseArray);
});

describe("blogsDb", () => {
  test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(initialBlogs.length);
  });

  test("ids are defined as 'id'", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body[0].id).toBeDefined();
  });

  test("blog is posted correctly", async () => {
    const newBlog = { title: "addedBlog", url: "smth" };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    const blogTitles = blogsAtEnd.map((b) => b.title);
    expect(blogTitles).toContain("addedBlog");
  });

  test("if likes are not added it will default to 0", async () => {
    const newBlog = { title: "likesBlog", url: "smth" };
    await api.post("/api/blogs").send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    const postedBlog = blogsAtEnd.find((b) => b.title === "likesBlog");
    expect(postedBlog.likes).toBe(0);
  });

  test("if title or url are not defined respond with 400 Bad request", async () => {
    const newBlog = { likes: 7, author: "tomi" };
    await api.post("/api/blogs").send(newBlog).expect(400);
    const newBlog2 = { title: "Hello", likes: 7, author: "tomi" };
    await api.post("/api/blogs").send(newBlog2).expect(400);
    const newBlog3 = { url: "hii", likes: 7, author: "tomi" };
    await api.post("/api/blogs").send(newBlog3).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
