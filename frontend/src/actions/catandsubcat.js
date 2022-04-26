import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  GET_CATS_REQUEST,
  GET_CATS_SUCCESS,
  GET_CATS_FAIL,
  GET_SUBCATS_REQUEST,
  GET_SUBCATS_SUCCESS,
  GET_SUBCATS_FAIL,
  CLEAR_MESSAGES,
  CLEAR_ERRORS,
} from "../constants/catandsubcat";

//Get Cats
export const getCats = () => async (dispatch) => {
  dispatch({ type: GET_CATS_REQUEST });
  //   debugger;
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}category/get-all`,
    });
    // debugger;
    const { data } = response;
    dispatch({
      type: GET_CATS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get SubCats
export const getSubCats = (catId) => async (dispatch) => {
  dispatch({ type: GET_SUBCATS_REQUEST });
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}subcategory/get?of=${catId}`,
    });
    const { data } = response;
    dispatch({
      type: GET_SUBCATS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATS_FAIL,
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
