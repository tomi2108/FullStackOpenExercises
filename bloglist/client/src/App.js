import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import SaveBlogForm from "./components/SaveBlogForm";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, variant: null });

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedNoteAppUser");
    const userParsed = JSON.parse(userJson);
    setUser(userParsed);
  }, []);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      user ? setUser(user) : setUser(null);
    } catch (err) {
      setNotification({ message: `wrong username or password`, variant: "danger" });
      setTimeout(() => {
        setNotification({ message: null, variant: null });
      }, 4000);
    }
  };

  const handleLogout = () => {
    setBlogs([]);
    setUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };

  const addBlog = async (blogObj) => {
    const resp = await blogService.create(blogObj);
    setBlogs(blogs.concat(resp));
    setNotification({ message: `a new blog ${blogObj.title} by ${blogObj.author} added`, variant: "success" });
    setTimeout(() => {
      setNotification({ message: null, variant: null });
    }, 4000);
  };

  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to app</h2>
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification message={notification.message} variant={notification.variant} />
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
          <SaveBlogForm addBlog={addBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
