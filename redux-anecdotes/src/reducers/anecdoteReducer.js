import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a));
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdote = (oldAnecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
    await anecdoteService.update(votedAnecdote);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;
