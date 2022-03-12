import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import SaveBlogForm from "./components/SaveBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, variant: null });

  const blogFormRef = useRef();

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogAppUser");
    if (userJson) {
      const userParsed = JSON.parse(userJson);
      setUser(userParsed);
      blogService.setToken(userParsed.token);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      user ? setUser(user) : setUser(null);
    } catch (err) {
      setNotification({ message: "wrong username or password", variant: "danger" });
      setTimeout(() => {
        setNotification({ message: null, variant: null });
      }, 4000);
    }
  };

  const handleLogout = () => {
    setBlogs([]);
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    const resp = await blogService.create(blogObj);
    setBlogs(blogs.concat(resp));
    setNotification({ message: `a new blog ${blogObj.title} by ${blogObj.author} added`, variant: "success" });
    setTimeout(() => {
      setNotification({ message: null, variant: null });
    }, 4000);
  };

  const updateBlog = async (blogObj) => {
    const updatedBlog = await blogService.update(blogObj);
    setBlogs(blogs.map((b) => (b.id === blogObj.id ? updatedBlog : b)));
  };

  const removeBlog = async (blog) => {
    await blogService.erase(blog);
    setBlogs(blogs.filter((b) => b.id !== blog.id));
  };

  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to app</h2>
          <Notification message={notification.message} variant={notification.variant} />
          <Togglable closeLabel="cancel" openLabel="Show login">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification message={notification.message} variant={notification.variant} />
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
          <br />
          <Togglable closeLabel="cancel" openLabel="Add blog" ref={blogFormRef}>
            <SaveBlogForm addBlog={addBlog} />
          </Togglable>
          <div id="blogContainer">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog, i) => (
                <Blog id={`blog${i}`} removeBlog={removeBlog} updateBlog={updateBlog} key={blog.id} blog={blog} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
