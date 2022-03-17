import React from "react";
import { useDispatch } from "react-redux";

import { deleteBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const remove = () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <div id={blog.id} className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>

      <button onClick={remove}>delete</button>
    </div>
  );
};

export default Blog;
