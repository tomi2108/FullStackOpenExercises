import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(({ buttonClose, buttonOpen, children }, ref) => {
  const [visible, setVisible] = useState(false);

  Togglable.displayName = "Togglable";

  Togglable.propTypes = {
    buttonOpen: PropTypes.string.isRequired,
    buttonClose: PropTypes.string.isRequired,
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
        {buttonClose}
      </Button>
      {children}
    </>
  ) : (
    <Button variant="outline-info" onClick={toggleVisibility}>
      {buttonOpen}
    </Button>
  );
});

export default Togglable;
