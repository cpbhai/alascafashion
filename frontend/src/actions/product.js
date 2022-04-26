import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  CLEAR_MESSAGES,
  CLEAR_ERRORS,
} from "../constants/product";

//Add Product
export const addProduct = (body) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  try {
    // console.log(body);
    const token = cookie.load("token");
    const response = await axios({
      method: "post",
      url: `${BASE_URL}product/add`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const { data } = response;
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Products
export const getProducts = (query) => async (dispatch) => {
  // console.log(query);
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}product/get?${query}`,
    });
    const { data } = response;
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Specific Product
export const getSpecificProd = (_id) => async (dispatch) => {
  // console.log(query);
  dispatch({ type: GET_PRODUCT_REQUEST });
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}product/${_id}`,
    });
    const { data } = response;
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
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
