import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = (props) => {
  const show = props.notification === "" ? false : true;

  return show ? (
    <>
      <Alert severity="success">{props.notification}</Alert>
      <br />
    </>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
    timerId: state.notification.timerId,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
