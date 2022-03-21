import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommend = (props) => {
  const userQuery = useQuery(CURRENT_USER);
  const bookQuery = useQuery(ALL_BOOKS);

  if ((userQuery.loading || bookQuery.loading) && props.show) return <div>loading...</div>;
  if (!props.show) return null;

  const books = bookQuery.data.allBooks;
  const user = userQuery.data.me;

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>Books in your favorite genre: "{user.favoriteGenre}"</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map((b) => {
            if (b.genres.includes(user.favoriteGenre)) {
              return (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
