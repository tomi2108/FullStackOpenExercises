import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Togglable from "./Togglable";

import { putBlog, deleteBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, id }) => {
  const dispatch = useDispatch();

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
    dispatch(putBlog(newBlog));
  };

  const remove = () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <div id={id} className="blog" style={blogStyle}>
      <div>{blog.title}</div>
      <Togglable closeLabel="Hide" openLabel="View">
        <div>
          url: {blog.url}
          <br />
          likes: {likes}
          <button id="like" onClick={addLike}>
            like
          </button>
          <br />
          author: {blog.author}
          <button onClick={remove}>delete</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
