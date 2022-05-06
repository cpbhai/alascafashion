import "./Signup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup, clearErrors, clearMessages } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../../utils/SendNotif";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const Signup = () => {
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
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Client",
  });
  const { name, email, phone, password } = values;
  const handleSubmit = (e) => {
    // console.log(values);
    dispatch(signup(values));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <MetaData title="Sign Up | Alasca Fashion" />
      <div className="SignupHeight"></div>
      <form className="signupForm dFlexWrap justfyeven">
        <div>
          <img src="/signupBg.png" alt="" className="signupImage" />
        </div>
        <div className="signupForInputs">
          <Typography variant="h5" gutterBottom component="div" sx={{ ml: 8 }}>
            Please Register
          </Typography>
          <TextField
            type="text"
            label="Your Name"
            name="name"
            value={name}
            onChange={handleChange}
            sx={{ mt: 1, width: "300px" }}
          />
          <TextField
            type="email"
            label="Your Email"
            name="email"
            value={email}
            onChange={handleChange}
            sx={{ mt: 2, width: "300px" }}
          />
          <TextField
            type="text"
            label="Your Phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            sx={{ mt: 2, width: "300px" }}
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
            color="success"
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              mb: 1,
              ml: "70px",
              "&:hover": { backgroundColor: "#fff", color: "success.main" },
            }}
            onClick={handleSubmit}
          >
            Register Me
          </Button>
          <br></br>
          <Link
            to={`/login?next=${params ? params : "/"}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              color="secondary"
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                ml: "53px",
                "&:hover": { backgroundColor: "#fff", color: "secondary.main" },
              }}
            >
              Already a User?
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
