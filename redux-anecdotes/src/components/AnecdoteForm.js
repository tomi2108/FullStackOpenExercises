import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const create = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    const anecdote = { content, votes: 0, id: `${props.anecdotes.length}` };
    props.createAnecdote(anecdote);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = {
  createAnecdote,
};

const connectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
