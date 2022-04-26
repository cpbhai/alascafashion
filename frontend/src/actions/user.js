import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  NO_USER,
  USER_DETAILS,
  LOAD_USER,
  LOGOUT_REQUEST,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/user";

//Signup
export const signup = (body) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}user/signup`,
      data: body,
    });
    const { data } = response;
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: {
        user: data.data,
        message: data.message,
      },
    });
    cookie.save("token", data.token);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//Login
export const login = (body) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}user/login`,
      data: body,
    });
    const { data } = response;
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        user: data.data,
        message: data.message,
      },
    });
    cookie.save("token", data.token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { error: error.response.data.message },
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}user/load-user`,
      headers: {
        "x-access-token": token,
      },
    });
    const { data } = response;
    dispatch({
      type: USER_DETAILS,
      payload: data.data,
    });
  } catch (error) {
    cookie.remove("token");
    dispatch({
      type: NO_USER,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    cookie.remove("token", { path: "/" });
    dispatch({
      type: NO_USER,
    });
  } catch (error) {}
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
