import cookie from "react-cookies";
import SendNotif from "../utils/SendNotif";
import {
  LOAD_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../constants/design";

//load Cart
export const loadCart = () => async (dispatch) => {
  // debugger;
  let cart = cookie.load("cart"),
    finalValue = [];
  try {
    if (cart) {
      cart = JSON.parse(JSON.stringify(cart));
      if (!Array.isArray(cart)) finalValue = [];
      else {
        if (cart.length >= 1) finalValue = cart.slice(0, 1);
      }
    }
  } catch (error) {}

  cookie.save("cart", JSON.stringify(finalValue), { path: "/" });
  dispatch({ type: LOAD_CART, payload: finalValue });
};

//addto Cart
export const addToCart = (product, page, qty) => async (dispatch) => {
  // debugger;
  let cart = cookie.load("cart"),
    finalValue = [product];
  if (page == "cart-page") {
    product = cart[0];
    try {
      if (cart) {
        cart = JSON.parse(JSON.stringify(cart));
        if (!Array.isArray(cart)) {
          product.quantity = 2;
          finalValue = [product];
        } else {
          if (product.quantity == 1 && qty == -1)
            return dispatch(SendNotif("error", "Can't reduce more"));
          else if (product.quantity == product.inStock && qty == 1)
            return dispatch(
              SendNotif("error", "Can't exceed more than available Stock")
            );
          product.quantity = product.quantity + qty;
          finalValue = [product];
        }
      }
    } catch (error) {
      finalValue = [];
    }
  }
  cookie.save("cart", JSON.stringify(finalValue), { path: "/" });
  dispatch({ type: CLEAR_CART, payload: finalValue });
};
//clear Cart
export const clearCart = () => async (dispatch) => {
  cookie.save("cart", JSON.stringify([]), { path: "/" });
  dispatch({ type: CLEAR_CART, payload: [] });
};
