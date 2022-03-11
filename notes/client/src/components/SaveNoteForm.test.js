import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SaveNoteForm from "./SaveNoteForm";
import userEvent from "@testing-library/user-event";

test("<SaveNoteForm /> updates parent state and calls onSubmit", () => {
  const createNote = jest.fn();

  render(<SaveNoteForm addNote={createNote} />);

  const input = screen.getByPlaceholderText("Write a new note...");
  const sendButton = screen.getByText("Save");

  userEvent.type(input, "testing a form...");
  userEvent.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
