import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ notification }) => {
  return <Alert variant="success">{notification}</Alert>;
};

export default Notification;
