import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    const anecdote = { content, votes: 0, id: `${anecdotes.length}` };
    dispatch(createAnecdote(anecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
