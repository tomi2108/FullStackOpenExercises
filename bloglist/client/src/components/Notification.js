import { useSelector } from "react-redux";

const Notification = () => {
  const { variant, message } = useSelector((state) => state.notification);

  if (message === null || variant === null) {
    return null;
  }

  return (
    <p variant={variant} className="error">
      {message}
    </p>
  );
};

export default Notification;
