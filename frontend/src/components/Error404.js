import { Fragment } from "react";
import MetaData from "../utils/MetaData";
const Error404 = () => {
  return (
    <Fragment>
      <MetaData title="Page Not Found - 404 | Alasca Fashion" />

      <img
        src="/404.jpg"
        alt="404"
        style={{
          margin: "10px 5px 0 5px",
          height: "87vh",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Fragment>
  );
};

export default Error404;
