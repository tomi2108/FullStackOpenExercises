import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { putBlog } from "../../reducers/blogsReducer";

const BlogMiniDetails = ({ blog }) => {
  const dispatch = useDispatch();
  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(putBlog(newBlog));
  };
  return (
    <>
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>/ {blog.likes} likes :{" "}
        <button id="like" onClick={addLike}>
          like
        </button>
      </p>
    </>
  );
};

export default BlogMiniDetails;
