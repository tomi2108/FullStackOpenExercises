import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useField } from "../hooks";

const SaveBlogForm = ({ addBlog }) => {
  const user = useSelector((state) => state.user);

  const title = useField("text");
  const url = useField("text");

  const createBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title.value,
      author: user.username,
      url: url.value,
    };
    addBlog(blogObject);
    title.value = "";
    url.value = "";
  };
  return (
    <Form onSubmit={createBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control placeholder="title" {...title} />
      </Form.Group>

      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control placeholder="url" {...url} />
      </Form.Group>

      <Button variant="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default SaveBlogForm;
