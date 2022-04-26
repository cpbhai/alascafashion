import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login, clearErrors, clearMessages } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../../utils/SendNotif";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search).get("next");
  const { error, message, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (user) {
      if (message) {
        dispatch(SendNotif("success", message));
        dispatch(clearMessages());
      }
      navigate(params ? params : "/");
    }
  }, [dispatch, error, message, user, navigate, params]);
  const [values, setValues] = useState({
    ID: "",
    password: "",
  });
  const { ID, password } = values;
  const handleSubmit = (e) => {
    // console.log(values);
    dispatch(login(values));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <div className="LoginHeight"></div>
      <form className="loginForm dFlexWrap justfyeven">
        <div>
          <img
            src="https://www.cbi-sarl.org/images/register-fig3.png"
            alt=""
            className="loginImage"
          />
        </div>
        <div className="loginForInputs">
          <Typography variant="h5" gutterBottom component="div" sx={{ ml: 10 }}>
            Please Log In
          </Typography>
          <TextField
            type="text"
            label="Your Email Or Phone"
            name="ID"
            value={ID}
            onChange={handleChange}
            sx={{ mt: 1, width: "300px" }}
          />

          <TextField
            type="password"
            label="Your Password"
            name="password"
            value={password}
            onChange={handleChange}
            sx={{ mt: 2, mb: 2, width: "300px" }}
          />
          <Button
            color="primary"
            variant="contained"
            startIcon={<LoginIcon />}
            sx={{
              mb: 1,
              ml: "100px",
              "&:hover": { backgroundColor: "white", color: "primary.main" },
            }}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <br></br>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                background: "#ec407a",
                ml: "83px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#ec407a",
                },
              }}
              variant="contained"
              startIcon={<PersonAddIcon />}
            >
              New User?
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
