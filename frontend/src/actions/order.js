import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_MESSAGES,
  CLEAR_ERRORS,
} from "../constants/order";

//Create Order
export const createOrder = (body) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    // console.log(body);
    const token = cookie.load("token");
    const response = await axios({
      method: "post",
      url: `${BASE_URL}order/place`,
      data: body,
      headers: {
        "x-access-token": token,
      },
    });
    const { data } = response;
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
