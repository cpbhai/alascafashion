import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
// import MainDrawer from "./MainDrawer";
import { SHOW_SIDE_PANEL, HIDE_SIDE_PANEL } from "../../../constants/design";
// import { loadCart } from "../../redux/actions/cartActions";
// import Swal from "sweetalert2";
import SendNotif from "../../../utils/SendNotif";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { enableSidePanel, cart } = useSelector((state) => state.design);
  //   const { cart } = useSelector((state) => state.cartOps);
  //   useEffect(() => {
  //     // if (!cart) dispatch(loadCart());
  //   }, [dispatch /*cart*/]);
  const handleLogout = (e) => {
    dispatch(logout());
    dispatch(SendNotif("info", "Logged Out Successfully"));
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Log Out!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire("Successfully", "Logged Out.", "success");
    //     dispatch(logout());
    //     setTimeout(() => {
    //       window.open(window.location.pathname, "_self");
    //     }, 2000);
    //   }
    // });
  };
  const handleSwitch = () => {
    if (enableSidePanel) {
      dispatch({ type: HIDE_SIDE_PANEL });
    } else {
      dispatch({ type: SHOW_SIDE_PANEL });
    }
  };
  return (
    <Fragment>
      <Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={() => handleSwitch()}
              >
                {enableSidePanel ? (
                  <CloseIcon color="error" />
                ) : (
                  <MenuIcon color="secondary" />
                )}
              </IconButton>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" className="dFlex justfystart navLogoLink">
                  <img src="/logomain1.png" alt="..." className="navLogo-1" />
                </Link>
              </Typography>
              <Link to="/cart">
                <Badge
                  badgeContent={cart && cart.length}
                  // badgeContent="2"
                  sx={{
                    mr: 2,
                    "& .MuiBadge-badge": {
                      backgroundColor: "rgb(247, 7, 147)",
                      color: "#fff",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "#000" }} />
                </Badge>
              </Link>
              {user ? (
                <IconButton onClick={handleLogout}>
                  <LogoutIcon color="error" />
                </IconButton>
              ) : (
                <Link to="/signup">
                  <IconButton>
                    <AccountCircleIcon color="secondary" />
                  </IconButton>
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <div style={{ height: "61px" }}></div>
        </Box>
      </Fragment>
    </Fragment>
  );
};

export default Header;
