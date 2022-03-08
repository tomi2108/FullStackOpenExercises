import React, { useState } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import Note from "./Note";

const NotesViewer = ({ notes, updateNote }) => {
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOF = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    updateNote(changedNote);
  };

  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col xs={{ span: 2 }}>
            <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
              Show {showAll ? "important" : "all"}
            </Button>
          </Col>
        </Row>
      </Container>
      <Table striped>
        <tbody>
          {notesToShow.map((note) => {
            return (
              <tr key={note.id}>
                <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOF(note.id)} />
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default NotesViewer;
