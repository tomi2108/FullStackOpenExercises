import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/BlogList";
import SaveBlogForm from "./components/SaveBlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, resetBlogs } from "./reducers/blogsReducer";
import { login, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogAppUser");
    if (userJson) {
      const userParsed = JSON.parse(userJson);
      dispatch(login(userParsed));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs(user));
    }
  }, [user, dispatch]);

  const handleLogin = async (credentials) => {
    try {
      dispatch(login(credentials));
    } catch (err) {
      dispatch(setNotification({ message: "wrong username or password", variant: "danger" }, 4));
    }
  };

  const handleLogout = () => {
    dispatch(resetBlogs());
    dispatch(logout());
  };

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObj));
    dispatch(setNotification({ message: `a new blog ${blogObj.title} by ${blogObj.author} added`, variant: "success" }, 5));
  };

  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to app</h2>
          <Notification />
          <Togglable closeLabel="cancel" openLabel="Show login">
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification />
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
          <br />
          <Togglable closeLabel="cancel" openLabel="Add blog" ref={blogFormRef}>
            <SaveBlogForm addBlog={addBlog} />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
