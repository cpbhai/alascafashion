import cookie from "react-cookies";
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
export const addToCart = (product) => async (dispatch) => {
  // debugger;
  cookie.save("cart", JSON.stringify([product]), { path: "/" });
  dispatch({ type: CLEAR_CART, payload: [product] });
};
//clear Cart
export const clearCart = () => async (dispatch) => {
  cookie.save("cart", JSON.stringify([]), { path: "/" });
  dispatch({ type: CLEAR_CART, payload: [] });
};
