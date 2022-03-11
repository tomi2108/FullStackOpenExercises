import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(({ buttonClose, buttonOpen, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div className="togglableContent" style={showWhenVisible}>
        <Button variant="outline-danger" onClick={toggleVisibility}>
          {buttonClose}
        </Button>
        <div>{children}</div>
      </div>
      <div style={hideWhenVisible}>
        <Button variant="outline-info" onClick={toggleVisibility}>
          {buttonOpen}
        </Button>
      </div>
    </>
  );
});
Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonOpen: PropTypes.string.isRequired,
  buttonClose: PropTypes.string.isRequired,
};

export default Togglable;
