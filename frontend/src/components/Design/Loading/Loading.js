import Backdrop from "@mui/material/Backdrop";
import "./Loading.css";
const Loading = ({ show }) => {
  //show may be undefined so used ternary ops
  return (
    <Backdrop
      sx={{
        backgroundColor: "rbg(0, 0, 0, 0.2)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={show ? true : false}
    >
      <div className="lds-heart">
        <div></div>
      </div>
    </Backdrop>
  );
};
export default Loading;
