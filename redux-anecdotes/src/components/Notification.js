import { connect } from "react-redux";
const Notification = (props) => {
  console.log(props);
  const show = props.notification === "" ? false : true;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return show ? (
    <>
      <div style={style}>{props.notification}</div>
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
