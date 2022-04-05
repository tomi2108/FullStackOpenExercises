import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import Author from "./Author";
import SetAuthorsBirth from "./SetAuthorsBirth";

const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS);
  if (loading && props.show) return <div>loading...</div>;

  if (!props.show) {
    return null;
  }

  const authors = data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <Author key={a.id} a={a} />
          ))}
        </tbody>
      </table>
      <SetAuthorsBirth authors={authors} />
    </div>
  );
};

export default Authors;
