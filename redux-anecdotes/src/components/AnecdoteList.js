import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteWithId } from "../reducers/anecdoteReducer";
import { showNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const regex = new RegExp(filter, "g");
  const filteredAnecdotes = [...anecdotes].filter((a) => a.content.match(regex));

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdoteWithId(id));
    dispatch(showNotification(`you voted '${anecdoteToVote.content}'`));
    setTimeout(() => hideNotification(), 5000);
  };

  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
