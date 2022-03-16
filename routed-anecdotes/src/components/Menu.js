import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Menu = () => {
  const padding = {
    paddingRight: 5,
    textDecoration: "none",
  };
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link>
            <Link to="/anecdotes" style={padding}>
              Anecdotes
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/create" style={padding}>
              Create new
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/" style={padding}>
              About
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
