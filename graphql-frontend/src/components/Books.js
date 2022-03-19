import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const { data, loading } = useQuery(ALL_BOOKS);
  if (loading && props.show) return <div>loading...</div>;

  if (!props.show) {
    return null;
  }

  const books = data.allBooks;

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
    </div>
  );
};

export default Books;
