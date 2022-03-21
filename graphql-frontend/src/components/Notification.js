const Notification = ({ variant, message }) => {
  if (message === "") return null;

  if (message) {
    return (
      <p variant={variant} style={{ color: "red", backgroundColor: "lightgray", border: "2px solid red" }}>
        {message}
      </p>
    );
  }
};

export default Notification;
