import React from "react";
import { useSelector } from "react-redux";
import BlogMiniDetails from "./BlogMiniDetails";

const PersonalBlogList = ({ username }) => {
  const blogs = useSelector((state) => state.blogs);

  const blogsToSort = [...blogs].filter((b) => b.author === username);

  return (
    <div id="blogContainer">
      {blogsToSort
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogMiniDetails key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default PersonalBlogList;
