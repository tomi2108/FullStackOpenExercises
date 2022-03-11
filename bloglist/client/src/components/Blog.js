import React, { useState } from "react";
import Togglable from "./Togglable";
const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const addLike = () => {
    setLikes(likes + 1);
    const newBlog = { ...blog, likes: likes + 1 };
    updateBlog(newBlog);
  };
  const remove = () => {
    removeBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <Togglable closeLabel="Hide" openLabel="View">
        <div>
          url: {blog.url}
          <br />
          likes: {likes}
          <button onClick={addLike}>like</button>
          <br />
          author: {blog.author}
          <button onClick={remove}>delete</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
