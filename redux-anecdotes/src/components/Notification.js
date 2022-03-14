import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const show = notification === "" ? false : true;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return show ? (
    <>
      <div style={style}>{notification}</div>
      <br />
    </>
  ) : (
    <></>
  );
};

export default Notification;
