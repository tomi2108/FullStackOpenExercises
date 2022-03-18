import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeAllBlogs } from "./reducers/blogsReducer";
import { login } from "./reducers/userReducer";
import LoginPage from "./components/pages/LoginPage";
import BlogsPage from "./components/pages/BlogsPage";

import Container from "@material-ui/core/Container";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogAppUser");
    if (userJson) {
      const userParsed = JSON.parse(userJson);
      dispatch(login(userParsed));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeAllBlogs());
    }
  }, [user, dispatch]);

  return <Container>{!user ? <LoginPage /> : <BlogsPage user={user} />}</Container>;
};

export default App;
