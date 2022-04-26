import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/User/Signup/Signup";
import Login from "./components/User/Login/Login";
import Notify from "./components/Design/Notify";
import Header from "./components/Design/Header/Header";
import Loading from "./components/Design/Loading/Loading";
import SidePanel from "./components/Design/SidePanel/SidePanel";
// import Footer from "./components/Design/Footer/Footer";
// import PrivacyPolicy from "./components/other/PrivacyPolicy";
// import TermsNConditions from "./components/other/TermsNConditions";
// import SearchTrip from "./components/Trip/SearchTrip";
// import PostTrip from "./components/Trip/PostTrip";
// import MyTrips from "./components/Trip/MyTrips";
import store from "./store";
import { loadUser } from "./actions/user";
import { loadCart } from "./actions/design";
import { useSelector } from "react-redux";
import AddProduct from "./components/Product/AddProduct/AddProduct";
import Products from "./components/Product/Products/Products";
import Product from "./components/Product/Product/Product";
import Cart from "./components/Cart/Cart";
// import Swal from "sweetalert2";
function App() {
  const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadCart());
  }, []);
  // const LoginRequired = () => {
  //   // Swal.fire({
  //   //   title: "You are not logged in!",
  //   //   text: "Please, Log In or Sign Up",
  //   //   icon: "warning",
  //   // });
  // };
  return (
    <Router>
      <Header />
      <SidePanel />
      <Loading show={loading} />
      <Notify />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/add-product"
          element={
            user && user.role === "Supplier" ? (
              <AddProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:_id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
export default App;
