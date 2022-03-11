import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SaveBlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    addBlog(blogObject);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <Form onSubmit={createBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control onChange={(e) => setNewTitle(e.target.value)} type="text" value={newTitle} />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control onChange={(e) => setNewAuthor(e.target.value)} type="text" value={newAuthor} />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control onChange={(e) => setNewUrl(e.target.value)} type="text" value={newUrl} />
      </Form.Group>

      <Button variant="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default SaveBlogForm;
