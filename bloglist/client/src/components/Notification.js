import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const { variant, message } = useSelector((state) => state.notification);

  if (message === null || variant === null) {
    return null;
  }

  return (
    <Alert variant={variant} className="error">
      {message}
    </Alert>
  );
};

export default Notification;
