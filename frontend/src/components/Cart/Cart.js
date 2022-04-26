import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/design";
import Button from "@mui/material/Button";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.design);
  const clear = () => {
    dispatch(clearCart());
  };
  if (!cart)
    return (
      <>
        <div style={{ height: "100vh" }}></div>
      </>
    );
  return (
    <>
      {cart.length ? (
        <div className="cartDiv">
          <img
            src={cart[0].images[cart[0].thumbnail].url}
            alt="..."
            className="cartProdImg"
          />
          <Button variant="contained" color="error" onClick={clear}>
            Remove from Cart
          </Button>
        </div>
      ) : (
        <div>No Item in your cart</div>
      )}
    </>
  );
};

export default Cart;
