import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { useField } from "../../hooks";
import { putBlog } from "../../reducers/blogsReducer";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);

  const match = useMatch("/blogs/:id");
  const id = match.params.id;

  const blog = blogs.find((b) => b.id === id);

  const dispatch = useDispatch();
  const comment = useField("text");

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(putBlog(newBlog));
  };

  const postComment = (e) => {
    e.preventDefault();
    const newBlog = { ...blog, comments: blog.comments.concat(comment.input.value) };
    comment.reset();
    dispatch(putBlog(newBlog));
  };

  if (!blog) return null;

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
      <h4>This blog has {blog.comments.length} comments:</h4>
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={index}>{comment}</li>;
        })}
      </ul>
      <form onSubmit={postComment}>
        <input placeholder="Share your comment!" {...comment.input} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default BlogDetails;
