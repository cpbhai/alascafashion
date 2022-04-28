import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  ADD_SUBSCRIBER_REQUEST,
  ADD_SUBSCRIBER_SUCCESS,
  ADD_SUBSCRIBER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/subscriber";

//subscribe
export const subscribe = (body) => async (dispatch) => {
  dispatch({ type: ADD_SUBSCRIBER_REQUEST });
  // debugger;
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}subscriber/add`,
      data: body,
    });
    const { data } = response;
    dispatch({
      type: ADD_SUBSCRIBER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUBSCRIBER_FAIL,
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
