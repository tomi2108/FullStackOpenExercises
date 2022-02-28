import React from "react";
import CountryDetails from "./CountryDetails";
import { Button, Card } from "react-bootstrap";

const Country = ({ details, country, onClick, index }) => {
  if (details) {
    const arr = [country];
    return (
      <>
        <CountryDetails arr={arr} />
        <Button variant="success" onClick={onClick} id={index}>
          Show less
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Card.Title>{country.name}</Card.Title>{" "}
        <Button variant="success" onClick={onClick} id={index}>
          Show more
        </Button>
      </>
    );
  }
};

export default Country;
