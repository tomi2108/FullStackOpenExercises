import React from "react";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((resp) => {
      setNotes(resp);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((resp) => {
      setNotes(notes.concat(resp));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const toggleImportanceOF = (id) => {
    const note = notes.find((n) => n.id === id);

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((resp) => {
        setNotes(notes.map((note) => (note.id !== id ? note : resp)));
      })
      .catch((error) => {
        setErrorMessage(`Note "${note.content}" was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div className="container">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <Button variant="secondary" onClick={toggleShowAll}>
          Show {showAll ? "important" : "all"}
        </Button>
      </div>
      <Table striped>
        <tbody>
          {notesToShow.map((note) => {
            return (
              <tr key={note.id}>
                <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOF(note.id)} />
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Form onSubmit={addNote}>
        <Form.Control onChange={handleNoteChange} type="text" value={newNote} />
        <br />
        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default App;
