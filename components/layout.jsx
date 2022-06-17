import Head from "next/head";
import Navbar from "./design/Navbar";
import GlobalLoading from "./design/GlobalLoading";
import Toast from "./toast/toast";
// import { useContext } from "react";
// import { DataContext } from "../store/globalstate";

function layout({ children }) {
  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href="/logosm2.png" type="image/x-icon" /> */}
      </Head>
      <Navbar />
      <GlobalLoading />
      <Toast />
      {/* <Loading show={routeChanged} /> */}
      {children}
    </>
  );
}

export default layout;
