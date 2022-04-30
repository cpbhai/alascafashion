import "./Footer.css";
import {
  subscribe,
  clearErrors,
  clearMessages,
} from "../../../actions/subscriber";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import SendNotif from "../../../utils/SendNotif";
import Loading from "../../Design/Loading/Loading";
import { Link } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector((state) => state.subscriber);
  useEffect(() => {
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      setValues({ name: "", email: "" });
    }
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
  }, [dispatch, message, error]);

  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const { name, email } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubscribe = () => {
    if (!name) return dispatch(SendNotif("error", "Name is missing"));
    if (!email) return dispatch(SendNotif("error", "Email is missing"));
    dispatch(subscribe(values));
  };
  return (
    <>
      <Loading show={loading} />
      <div className="footerMainDiv">
        <div className="footerChildrens">
          <div>
            <p className="heading">Quick Navigation</p>
            <p className="para">
              <Link
                to="/products?sortBy=latest"
                className="negateUnderLine white"
              >
                Products
              </Link>
            </p>
            <p className="para">
              <Link
                to="/products?sortBy=latest&amp;category=62650572a8fc44666c191d7c&amp;subcategory=626505b9a8fc44666c191d85"
                className="negateUnderLine white"
              >
                Suits
              </Link>
            </p>
            <p className="para">
              <Link
                to="/products?sortBy=latest&amp;category=62650572a8fc44666c191d7c&amp;subcategory=626505a6a8fc44666c191d7f"
                className="negateUnderLine white"
              >
                Lehengas
              </Link>
            </p>
            <p className="para">
              <Link
                to="/products?sortBy=latest&amp;category=62650572a8fc44666c191d7c&amp;subcategory=626505b5a8fc44666c191d82"
                className="negateUnderLine white"
              >
                Sarees
              </Link>
            </p>
          </div>
          <div>
            <p className="heading">Important Links</p>
            <p className="para">
              <Link to="/about-us" className="negateUnderLine white">
                About Us
              </Link>
            </p>

            <p className="para">
              <Link to="/privacy-policy" className="negateUnderLine white">
                Privacy Policy
              </Link>
            </p>

            <p className="para">
              <Link
                to="/terms-and-conditions"
                className="negateUnderLine white"
              >
                Terms &amp; Conditions
              </Link>
            </p>

            <p className="para">
              <Link to="/faqs" className="negateUnderLine white">
                FAQs
              </Link>
            </p>
          </div>
          <div>
            <p className="heading">Contact Us</p>
            <p className="para">
              <Link to="tel:+917055335905" className="negateUnderLine white">
                +91-7055335905
              </Link>
            </p>
            <p className="para">
              <Link
                to="mailto:alascafashion@gmail.com"
                className="negateUnderLine white"
              >
                alascafashion@gmail.com
              </Link>
            </p>
            <p className="para">
              Address: 35, Golf Course Rd, Suncity, Sector 54, Gurgaon, Haryana
              122022
            </p>
          </div>
          <div>
            <p className="heading">Get Updates about Latest Products</p>
            <TextField
              sx={{
                background: "#fff",
                input: {
                  color: "#000",
                },
                mt: 2,
                "& .MuiFormLabel-root": {
                  color: "#000",
                },
              }}
              label="Your Name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <br></br>
            <TextField
              sx={{
                background: "#fff",
                input: {
                  color: "#000",
                },
                mt: 2,
                "& .MuiFormLabel-root": {
                  color: "#000",
                },
              }}
              label="Your Email"
              variant="outlined"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              onClick={handleSubscribe}
              sx={{
                mt: 2,
                background: "#9c27b0",
                "&:hover": {
                  background: "#000",
                  color: "#fff",
                  border: "2px solid #9c27b0",
                },
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
        <div className="footerSocialMedia"></div>
      </div>
    </>
  );
};

export default Footer;
