import { Fragment, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_SIDE_PANEL } from "../../../constants/design";
import { Link } from "react-router-dom";
import "./SidePanel.css";

const MainDrawer = () => {
  const dispatch = useDispatch();
  const { enableSidePanel } = useSelector((state) => state.design);
  const { user } = useSelector((state) => state.user);
  const open = useRef(null);
  useEffect(() => {
    if (enableSidePanel) {
      let v = open.current.classList;
      if (v.value.includes("mdanimateclose")) v.remove("mdanimateclose");
      v.add("mdanimateopen");
    }
    if (!enableSidePanel) {
      let v = open.current.classList;
      if (v.value.includes("mdanimateopen")) v.remove("mdanimateopen");
      v.add("mdanimateclose");
    }
  }, [enableSidePanel, open]);
  return (
    <Fragment>
      <div
        className="mainDrawer"
        ref={open}
        onClick={() => dispatch({ type: HIDE_SIDE_PANEL })}
      >
        <Link to="/" className="negateUnderLine">
          <div className="mdNormal ">
            <Grid container alignItems="center" className="mdItem" gap={0.3}>
              <HomeIcon sx={{ mr: 1 }} />
              Home
            </Grid>
          </div>
        </Link>
        <Link to="/products" className="negateUnderLine">
          <div className="mdNormal ">
            <Grid container alignItems="center" className="mdItem" gap={0.3}>
              <CheckroomIcon sx={{ mr: 1 }} />
              Products
            </Grid>
          </div>
        </Link>
        {!user && (
          <Link to="/signup" className="negateUnderLine">
            <div className="mdNormal ">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <PersonAddIcon sx={{ mr: 1 }} />
                Sign Up
              </Grid>
            </div>
          </Link>
        )}
        {!user && (
          <Link to="/login" className="negateUnderLine">
            <div className="mdNormal ">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <LoginIcon sx={{ mr: 1 }} />
                Log In
              </Grid>
            </div>
          </Link>
        )}
        {user && (
          <Link to="/profile" className="negateUnderLine">
            <div className="mdNormal ">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <AccountBoxIcon sx={{ mr: 1 }} />
                My Profile
              </Grid>
            </div>
          </Link>
        )}
        {user && user.role === "Supplier" && (
          <Link to="/add-product" className="negateUnderLine">
            <div className="mdNormal ">
              <Grid container alignItems="center" className="mdItem" gap={0.3}>
                <PostAddIcon sx={{ mr: 1 }} />
                Add a Product
              </Grid>
            </div>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default MainDrawer;
