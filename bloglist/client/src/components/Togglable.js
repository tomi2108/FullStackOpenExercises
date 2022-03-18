import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Togglable = forwardRef(({ closeLabel, openLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return visible ? (
    <>
      <br />
      <Button variant="contained" onClick={toggleVisibility}>
        {closeLabel}
      </Button>
      {children}
    </>
  ) : (
    <>
      <br />
      <Button variant="contained" onClick={toggleVisibility}>
        {openLabel}
      </Button>
    </>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  closeLabel: PropTypes.string.isRequired,
  openLabel: PropTypes.string.isRequired,
};

export default Togglable;
