import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(({ closeLabel, openLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  Togglable.displayName = "Togglable";

  Togglable.propTypes = {
    closeLabel: PropTypes.string.isRequired,
    openLabel: PropTypes.string.isRequired,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return visible ? (
    <>
      <Button variant="outline-danger" onClick={toggleVisibility}>
        {closeLabel}
      </Button>
      {children}
    </>
  ) : (
    <Button variant="outline-info" onClick={toggleVisibility}>
      {openLabel}
    </Button>
  );
});

export default Togglable;
