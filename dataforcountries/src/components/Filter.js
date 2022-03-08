import React from "react";
import { Form } from "react-bootstrap";

const Filter = ({ onChange, searching }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label column>Search:</Form.Label>
        <Form.Control placeholder="Enter filter" onChange={onChange} value={searching} type="text" />
      </Form.Group>
    </Form>
  );
};

export default Filter;
