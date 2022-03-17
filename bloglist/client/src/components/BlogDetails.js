import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { putBlog } from "../reducers/blogsReducer";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  const id = match.params.id;
  const blog = blogs.find((b) => b.id === id);
  const dispatch = useDispatch();
  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(putBlog(newBlog));
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>
        This blog was written by: <Link to={`/user/${blog.author}`}>{blog.author}</Link>
      </h3>
      <p>
        This blog has {blog.likes} likes{" "}
        <button id="like" onClick={addLike}>
          {" "}
          Like
        </button>
      </p>
      <p>
        Find out more at <a href={`${blog.url}`}>{blog.url}</a>{" "}
      </p>
    </div>
  );
};

export default BlogDetails;
