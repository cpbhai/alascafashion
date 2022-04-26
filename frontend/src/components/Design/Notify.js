import MuiAlert from "@mui/material/Alert";
import React, { Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_NOTIFICATION } from "../../constants/design";

const Notify = () => {
  const dispatch = useDispatch();
  const { enableNotif, data } = useSelector((state) => state.design);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = () => {
    dispatch({ type: HIDE_NOTIFICATION });
  };
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={enableNotif ? true : false}
        autoHideDuration={5000}
        onClose={() => handleClose()}
      >
        <Alert
          onClose={() => handleClose()}
          severity={data ? data.bg : "warning"}
        >
          {data ? data.msg : ""}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Notify;
