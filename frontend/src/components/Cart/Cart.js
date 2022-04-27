import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../actions/design";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import Swal from "sweetalert2";
import SendNotif from "../../utils/SendNotif";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors, clearMessages } from "../../actions/order";
import Loading from "../Design/Loading/Loading";
const Cart = () => {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(product, user, amount) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = { currency: "INR", amount: amount * 100 };

    const options = {
      key: "rzp_live_43gEiC95hG74ZX",
      currency: data.currency,
      amount: data.amount.toString(),
      name: "Alasca Fashion",
      description: `${product.title.slice(0, 20)}...${product._id}`,
      handler: function (response) {
        let payload = {
          payment_id: response.razorpay_payment_id,
          quantity: product.quantity,
          product: product._id,
          name,
          phone,
          address,
          disCost: product.disCost,
          otherDetails: {
            size: product.sizes[product.size],
            colour: product.colours[product.colour],
            status: "Ordered",
          },
        };
        dispatch(createOrder(payload));
      },
      prefill: {
        name,
        email: user.email,
        contact: phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.design);
  const { user } = useSelector((state) => state.user);
  const { message, error, loading } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const initialState = {
    name: "",
    phone: "",
    address: {
      state: "",
      city: "",
      pincode: "",
      streetAddr: "",
      landmark: "",
    },
  };
  useEffect(() => {
    if (message) {
      Swal.fire(
        "Order Placed Successfully",
        "Thanks for shopping with us:)",
        "success"
      );
      dispatch(clearMessages());
      dispatch(clearCart());
      navigate("/orders");
    }
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    setStates(
      State.getStatesOfCountry("IN").map((each) => {
        return { label: each.name, _id: each.isoCode };
      })
    );
  }, [dispatch, message, error, navigate]);

  const clear = () => {
    dispatch(clearCart());
  };
  const changeCartQt = (value) => {
    dispatch(addToCart(null, "cart-page", value));
  };
  const [states, setStates] = useState([{ label: "None", _id: "" }]);
  const [cities, setCities] = useState([{ label: "None", _id: "" }]);
  let cartSavedData = localStorage.getItem("cartSavedData");
  if (cartSavedData) {
    try {
      cartSavedData = JSON.parse(cartSavedData);
    } catch (err) {
      localStorage.removeItem("cartSavedData");
      cartSavedData = initialState;
    }
    // debugger;
    cartSavedData.address.state = cartSavedData.address.city = "";
  } else localStorage.setItem("cartSavedData", JSON.stringify(initialState));
  const [values, setValues] = useState(
    cartSavedData ? cartSavedData : initialState
  );
  const { name, phone, address } = values;
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    let newState = { ...values };
    if (type === "Address") {
      newState.address[name] = value;
    } else newState[name] = value;
    localStorage.setItem("cartSavedData", JSON.stringify(newState));
    setValues(newState);
  };
  const handleSelect = (e, v, type) => {
    let newState = { ...values };
    if (type === "State") {
      newState.address.state = v._id;
      setCities(
        City.getCitiesOfState("IN", v._id).map((each) => {
          return { label: each.name, _id: each.name };
        })
      );
    } else if (type === "City") {
      newState.address.city = v._id;
    }
    setValues(newState);
  };
  const HandleCheckout = () => {
    //product, user, amount
    if (!name) dispatch(SendNotif("error", "Please Enter the Recipent's Name"));
    else if (!phone)
      dispatch(SendNotif("error", "Please Enter the Recipent's Phone"));
    else if (phone.length !== 10)
      dispatch(SendNotif("error", "Length of Recipent's Phone is not 10"));
    else if (!address.state)
      dispatch(SendNotif("error", "Please Enter the Recipent's State"));
    else if (!address.city)
      dispatch(SendNotif("error", "Please Enter the Recipent's City"));
    else if (!address.streetAddr)
      dispatch(
        SendNotif("error", "Please Enter the Recipent's Flat/Building/Colony")
      );
    else if (!address.landmark)
      dispatch(SendNotif("error", "Please Enter the Recipent's Near Place"));
    else if (!address.pincode)
      dispatch(SendNotif("error", "Please Enter the Recipent's PIN Code"));
    //address: { state: "", city: "", pincode: "", streetAddr: "", landmark: "" },
    else if (user)
      displayRazorpay(cart[0], user, cart[0].disCost * cart[0].quantity);
    else {
      Swal.fire({
        icon: "error",
        title: "Please Log In, before Buying",
        text: "Don't worry, entered details are stored safely.",
      });
      navigate("/login?next=/cart");
    }
  };
  if (cart === undefined) return <></>;
  return (
    <>
      <Loading show={loading} />
      {cart.length ? (
        <div className="cartDiv dFlexWrap justfyeven">
          <div>
            <img
              src={cart[0].images[cart[0].thumbnail].url}
              alt="..."
              className="cartProdImg"
            />
          </div>
          <div className="cartProdSpec textCenter">
            <p className="cartProdTitle">{cart[0].title.slice(0, 50)}...</p>
            <Button
              variant="contained"
              color="error"
              onClick={clear}
              sx={{ mb: 1 }}
            >
              Remove from Cart
            </Button>
            <br></br>
            <div className="dFlex justfycent cartQtBtnDiv">
              <Button
                variant="contained"
                color="warning"
                onClick={() => changeCartQt(-1)}
                sx={{ mr: 2 }}
              >
                -1
              </Button>
              <p style={{ margin: "5px  0 0 0", fontSize: "17px" }}>
                {cart[0].quantity}
              </p>
              <Button
                variant="contained"
                color="success"
                onClick={() => changeCartQt(1)}
                sx={{ ml: 2 }}
              >
                +1
              </Button>
            </div>
            <p className="cartTextCont">
              {cart[0].quantity} X ₹ {cart[0].disCost}
              {"  = ₹ "}
              {cart[0].quantity * cart[0].disCost}
            </p>
            <p className="cartTextCont">
              Colour:{" "}
              <span
                style={{
                  border: `10px solid ${cart[0].colours[cart[0].colour]}`,
                  padding: "2px",
                }}
              >
                {cart[0].colours[cart[0].colour]}
              </span>
            </p>
            <p className="cartTextCont">Size: {cart[0].sizes[cart[0].size]}</p>
            <p className="cartTextCont">In Stock: {cart[0].inStock}</p>
          </div>
          <div className="textCenter">
            <TextField
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Your Phone"
              variant="outlined"
              sx={{ mt: 1 }}
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            <br></br>
            <Autocomplete
              disablePortal
              options={states}
              onChange={(e, v) => handleSelect(e, v, "State")}
              sx={{ mt: 1 }}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
            <Autocomplete
              disablePortal
              options={cities}
              onChange={(e, v) => handleSelect(e, v, "City")}
              sx={{ mt: 1 }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
            <TextField
              id="outlined-basic"
              label="Flat/Building/Colony/Area"
              variant="outlined"
              sx={{ mt: 1 }}
              name="streetAddr"
              value={address.streetAddr}
              onChange={(e) => handleChange(e, "Address")}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Near Place?"
              variant="outlined"
              name="landmark"
              value={address.landmark}
              onChange={(e) => handleChange(e, "Address")}
              sx={{ mt: 1 }}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="PIN Code"
              variant="outlined"
              name="pincode"
              value={address.pincode}
              onChange={(e) => handleChange(e, "Address")}
              sx={{ mt: 1 }}
            />
            <br></br>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: "#6a1b9a",
                "&:hover": {
                  color: "#6a1b9a",
                  background: "#fff",
                  border: "1px solid #6a1b9a",
                },
              }}
              onClick={HandleCheckout}
              startIcon={<ShoppingCartCheckoutIcon />}
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div>No Item in your cart</div>
      )}
    </>
  );
};

export default Cart;
