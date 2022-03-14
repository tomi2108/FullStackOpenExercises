import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteWithId } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const regex = new RegExp(filter.toLowerCase(), "g");
  const filteredAnecdotes = [...anecdotes].filter((a) => a.content.toLowerCase().match(regex));

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdoteWithId(id));
    anecdoteService.update({ ...anecdoteToVote, votes: anecdoteToVote.votes + 1 });
    dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 5));
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
