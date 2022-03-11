import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SaveNoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    addNote(noteObject);
    setNewNote("");
  };

  return (
    <Form onSubmit={createNote}>
      <Form.Control placeholder="Write a new note..." onChange={(e) => setNewNote(e.target.value)} type="text" value={newNote} />
      <br />
      <Button variant="success" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default SaveNoteForm;
