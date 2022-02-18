import React from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ details, country, onClick, index }) => {
  if (details) {
    const arr = [country];
    return (
      <>
        <p>{country.name}</p>{" "}
        <button onClick={onClick} id={index}>
          show
        </button>
        <CountryDetails arr={arr} />
      </>
    );
  } else {
    return (
      <>
        <p>{country.name}</p>{" "}
        <button onClick={onClick} id={index}>
          show
        </button>
      </>
    );
  }
};

export default Country;
