import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdoteWithId(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      return state.map((a) => (a.id === id ? updatedAnecdote : a));
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload;
      return [...state, newAnecdote];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdoteWithId, createAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
