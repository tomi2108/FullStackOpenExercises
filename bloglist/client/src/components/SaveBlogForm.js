import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SaveBlogForm = ({ addBlog }) => {
  const user = useSelector((state) => state.user);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: newTitle,
      author: user.username,
      url: newUrl,
    };
    addBlog(blogObject);
    setNewTitle("");
    setNewUrl("");
  };
  return (
    <Form onSubmit={createBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control placeholder="title" onChange={(e) => setNewTitle(e.target.value)} type="text" value={newTitle} />
      </Form.Group>

      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control placeholder="url" onChange={(e) => setNewUrl(e.target.value)} type="text" value={newUrl} />
      </Form.Group>

      <Button variant="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default SaveBlogForm;
