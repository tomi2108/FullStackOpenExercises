import React from "react";
import { useSelector } from "react-redux";

import { useField } from "../../hooks";

const SaveBlogForm = ({ addBlog }) => {
  const user = useSelector((state) => state.user);

  const title = useField("text");
  const url = useField("text");

  const createBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title.input.value,
      author: user.username,
      url: url.input.value,
    };
    addBlog(blogObject);
    title.reset();
    url.reset();
  };

  return (
    <form onSubmit={createBlog}>
      <label htmlFor="title">title:</label>
      <input name="title" placeholder="title" {...title.input} />

      <label htmlFor="url">url:</label>
      <input name="url" placeholder="url" {...url.input} />

      <button type="submit">Save</button>
    </form>
  );
};

export default SaveBlogForm;
