import { Alert } from "react-bootstrap";
import { useState } from "react";

const Notification = ({ message, variant }) => {
  if (message === null || variant === null) {
    return null;
  }

  return (
    <Alert variant={variant} dissmisible className="error">
      {message}
    </Alert>
  );
};

export default Notification;
