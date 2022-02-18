import React from "react";
import Person from "./Person.js";

const Display = ({ state }) => {
  return (
    <>
      {state.map((person) => {
        return <Person key={person.id} person={person} />;
      })}
    </>
  );
};

export default Display;
