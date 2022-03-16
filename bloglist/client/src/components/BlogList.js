import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogsToSort = [...blogs];
  return (
    <div id="blogContainer">
      {blogsToSort
        .sort((a, b) => b.likes - a.likes)
        .map((blog, i) => (
          <Blog id={`blog${i}`} key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
