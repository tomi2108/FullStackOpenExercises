import React from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

import Notification from "../Notification";

import { resetBlogs } from "../../reducers/blogsReducer";

import { logout } from "../../reducers/userReducer";

import Home from "./Home";
import Profile from "./Profile";
import BlogDetails from "../BlogDetails";
import UsersList from "../UsersList";

const BlogsPage = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetBlogs());
    dispatch(logout());
  };

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <Link to="/">Home</Link>
      <Link to="/all/users">Users</Link>
      <br />
      <Link to={`/user/${user.username}`}>{user.name}</Link> logged in <button onClick={handleLogout}>Logout</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/all/users" element={<UsersList />} />
      </Routes>
      <br />
    </>
  );
};

export default BlogsPage;
