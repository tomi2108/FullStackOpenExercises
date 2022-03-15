import React, { useEffect, useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import About from "./components/About";
import AnecdotesList from "./components/AnecdotesList";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const initialState = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialState);
  const [notification, setNotification] = useState("");

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const match = useMatch("/anecdote/:id");

  const anecdote = match ? anecdoteById(Number(match.params.id)) : "";

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      {notification !== "" ? <Notification notification={notification} /> : null}

      <Routes>
        <Route path="/anecdote/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/anecdotes" element={<AnecdotesList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
        <Route path="/" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
