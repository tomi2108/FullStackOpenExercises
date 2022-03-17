import React from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  const id = match.params.id;
  const blog = blogs.find((b) => b.id === id);

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>This blog was written by: {blog.author}</h3>
      <p>This blog has {blog.likes} likes</p>
      <p>
        Find out more at <a href={`${blog.url}`}>{blog.url}</a>{" "}
      </p>
    </div>
  );
};

export default BlogDetails;
