import React from "react";
import { ListGroup, Card } from "react-bootstrap";

const CountryDetails = ({ arr }) => {
  const country = arr[0];

  return (
    <>
      <Card.Title>{country.name}</Card.Title>
      <br />
      <Card.Img style={{ outline: "solid black 1px" }} variant="top" src={country.flag} alt={country.name} />
      <br />
      <br />

      <Card.Subtitle className="mb-2 text-muted">Capital: {country.capital}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Area-code: {country.area}</Card.Subtitle>
      <ListGroup as="ol" numbered>
        {Object.values(country.languages).map((language) => (
          <ListGroup.Item key={language}>{language}</ListGroup.Item>
        ))}
      </ListGroup>
      <br />
    </>
  );
};

export default CountryDetails;
