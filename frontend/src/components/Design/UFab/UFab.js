import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { Fragment } from "react";

const UFab = () => {
  const callStyle = {
    margin: 0,
    top: "auto",
    right: "auto",
    bottom: 10,
    left: 10,
    position: "fixed",
  };
  const whatsappStyle = {
    backgroundColor: "green",
    color: "#fff",
    margin: 0,
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed",
  };
  return (
    <Fragment>
      <a href="tel:+917055335905" target="_blank" rel="noreferrer">
        <Fab color="primary" style={callStyle}>
          <CallIcon />
        </Fab>
      </a>
      <a
        href="http://wa.me/+917055335905?text=Hey%20Alasca Fashion,%20I%20want%20to%20ask:%0A"
        target="_blank"
        rel="noreferrer"
      >
        <Fab style={whatsappStyle}>
          <WhatsAppIcon />
        </Fab>
      </a>
    </Fragment>
  );
};

export default UFab;
