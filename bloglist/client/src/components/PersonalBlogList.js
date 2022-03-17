import React from "react";
import { useSelector } from "react-redux";
import BlogMiniDetails from "./BlogMiniDetails";

const PersonalBlogList = ({ username }) => {
  const blogs = useSelector((state) => state.blogs);

  const blogsToSort = [...blogs].filter((b) => b.author === username);

  return (
    <div id="blogContainer">
      <h4>User has {blogsToSort.length} Blogs</h4>
      <ul>
        {blogsToSort
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <BlogMiniDetails blog={blog} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PersonalBlogList;
