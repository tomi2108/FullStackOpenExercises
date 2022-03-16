import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const navigate = useNavigate();

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
    setNotification(`a new anecdote ${content.value} created!`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };
  const inputContent = { ...content, reset: "" };
  const inputAuthor = { ...author, reset: "" };
  const inputInfo = { ...info, reset: "" };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control {...inputContent} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control {...inputAuthor} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url for more info</Form.Label>
          <Form.Control {...inputInfo} />
        </Form.Group>
        <Button style={{ marginRight: "10px" }} type="submit">
          Create
        </Button>
        <Button type="button" onClick={() => resetFields()}>
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default CreateNew;
