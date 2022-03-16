import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

import Container from "@material-ui/core/Container";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <Container>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <br />
      <AnecdoteList />
    </Container>
  );
};

export default App;
