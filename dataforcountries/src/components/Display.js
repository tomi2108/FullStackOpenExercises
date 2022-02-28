import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Country from "./Country.js";

const Display = ({ viewMore, state, onClick }) => {
  return (
    <Row>
      {state.map((country, i) => {
        return (
          <>
            <Col>
              <br />
              <Card style={{ width: "400px" }}>
                <Card.Body>
                  <Country details={viewMore[i]} index={i} onClick={onClick} key={country.name} country={country} />
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      })}
    </Row>
  );
};

export default Display;
