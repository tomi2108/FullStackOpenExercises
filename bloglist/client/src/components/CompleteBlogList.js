import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const CompleteBloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogsToSort = [...blogs];
  return (
    <div id="blogContainer">
      {blogsToSort
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default CompleteBloglist;
