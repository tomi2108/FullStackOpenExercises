import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = ({ username, name }) => {
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter((b) => b.author === username);
  return (
    <>
      <td>
        <Link to={`/user/${username}`}>{name}</Link>
      </td>
      <td>{userBlogs.length}</td>
    </>
  );
};

export default User;
