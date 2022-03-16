import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

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
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputContent} />
        </div>
        <div>
          author
          <input {...inputAuthor} />
        </div>
        <div>
          url for more info
          <input {...inputInfo} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => resetFields()}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
