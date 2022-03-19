import React from "react";

const Author = ({ a }) => {
  return (
    <tr key={a.id}>
      <td>{a.name}</td>
      <td>{a.born}</td>
      <td>{a.bookCount}</td>
    </tr>
  );
};

export default Author;
