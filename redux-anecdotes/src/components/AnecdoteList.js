import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const regex = new RegExp(filter.toLowerCase(), "g");
  const filteredAnecdotes = [...anecdotes].filter((a) => a.content.toLowerCase().match(regex));

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(anecdoteToVote));
    dispatch(setNotification(`you voted '${anecdoteToVote.content}'`, 5));
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {filteredAnecdotes
            .sort((a, b) => b.votes - a.votes)
            .map((anecdote) => (
              <TableRow key={anecdote.id}>
                <TableCell>{anecdote.content}</TableCell>
                <TableCell>has {anecdote.votes}</TableCell>
                <TableCell>
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnecdoteList;
