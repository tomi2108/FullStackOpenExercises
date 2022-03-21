import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const { data, loading } = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState("all");
  if (loading && props.show) return <div>loading...</div>;

  if (!props.show) {
    return null;
  }

  const books = data.allBooks;

  let genres = [];

  if (books) {
    books.forEach((b) => {
      const bookGenres = b.genres;
      bookGenres.forEach((g) => {
        if (!genres.includes(g)) genres = genres.concat(g);
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
          {books
            .filter((b) => {
              if (genreFilter !== "all") return b.genres.includes(genreFilter);
              return true;
            })
            .map((b) => (
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
