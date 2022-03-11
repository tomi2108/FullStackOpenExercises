import { Alert } from "react-bootstrap";

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
