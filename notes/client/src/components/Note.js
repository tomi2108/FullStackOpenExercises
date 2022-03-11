import React from "react";
import { Button } from "react-bootstrap";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <tr key={note.id}>
      <td className="note">{note.content}</td>
      <td>
        <Button variant="outline-dark" onClick={toggleImportance}>
          {label}
        </Button>
      </td>
    </tr>
  );
};

export default Note;
