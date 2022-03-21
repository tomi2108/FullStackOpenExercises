import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all");
  const [genres, setGenres] = useState([]);

  const [getBooksByGenre, booksByGenreQuery] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooksByGenre({ variables: { genre: genreFilter === "all" ? null : genreFilter } });
  }, [genreFilter, getBooksByGenre]);

  if (!props.show) return null;
  if (booksByGenreQuery.loading && props.show) return <div>loading...</div>;

  let books = [];
  books = booksByGenreQuery.data.allBooks;

  if (genreFilter === "all") {
    books.forEach((b) => {
      b.genres.forEach((g) => {
        if (!genres.includes(g)) setGenres(genres.concat(g));
      });
    });
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenreFilter("all")}>all genres</button>
      {genres.map((g) => {
        return (
          <button key={g} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        );
      })}
    </div>
  );
};

export default Books;
