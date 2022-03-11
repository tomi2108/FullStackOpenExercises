import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

describe("<Notes/>", () => {
  test("renders content", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    render(
      <table>
        <Note note={note} />
      </table>
    );

    screen.getByText("Component testing is done with react-testing-library");
    screen.getByText("make not important");
  });

  test("clicking the button calls event handler once", async () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const button = screen.getByText("make not important");
    userEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
