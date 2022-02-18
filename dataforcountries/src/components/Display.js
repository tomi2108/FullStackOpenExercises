import React from "react";
import Country from "./Country.js";

const Display = ({ viewMore, state, onClick }) => {
  return (
    <>
      {state.map((country, i) => {
        return <Country details={viewMore[i]} index={i} onClick={onClick} key={country.name} country={country} />;
      })}
    </>
  );
};

export default Display;
