import "./main.css";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SaveNoteForm from "./components/SaveNoteForm";
import NotesViewer from "./components/NotesViewer";
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((resp) => {
      setNotes(resp);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      noteService.getFromUser(user).then((resp) => setNotes(resp));
    }
  }, [user]);

  const handleLogIn = async (event, { username, password }) => {
    event.preventDefault();
    const credentials = { username: username, password: password };
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

      setUser(user);
      noteService.setToken(user.token);
    } catch (exception) {
      setErrorMessage("Invalid username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    setNotes([]);
    noteService.setToken(null);
    window.localStorage.removeItem("loggedNoteAppUser");
    setUser(null);
  };

  const addNote = (noteObj) => {
    noteFormRef.current.toggleVisibility();
    const token = user.token;
    noteService.create(noteObj, token).then((resp) => {
      setNotes(notes.concat(resp));
    });
  };

  const updateNote = (noteObj) => {
    noteService
      .update(noteObj.id, noteObj)
      .then((resp) => {
        setNotes(notes.map((note) => (note.id !== noteObj.id ? note : resp)));
      })
      .catch(() => {
        setErrorMessage(`Note "${noteObj.content}" was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== noteObj.id));
      });
  };

  if (user === null) {
    return (
      <div className="container">
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <Togglable buttonClose="cancel" buttonOpen="Show login">
          <LoginForm handleLogin={handleLogIn} />
        </Togglable>

        <Footer />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        <div>
          <p>{user.name} logged-in</p>
        </div>
        <div>
          <Button size="sm" variant="danger" onClick={handleLogOut}>
            Logout
          </Button>
        </div>

        <NotesViewer notes={notes} updateNote={updateNote} />
        <Togglable buttonClose="cancel" buttonOpen="Add note" ref={noteFormRef}>
          <SaveNoteForm addNote={addNote} />
        </Togglable>
        <Footer />
      </div>
    );
  }
};

export default App;
