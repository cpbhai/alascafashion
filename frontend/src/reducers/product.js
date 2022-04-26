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

export const product = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
    case GET_PRODUCTS_REQUEST:
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, message: action.payload, loading: false };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, productsData: action.payload, loading: false };
    case GET_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case ADD_PRODUCT_FAIL:
      return { ...state, error: action.payload, loading: false };
    case GET_PRODUCTS_FAIL:
      return { ...state, productsData: action.payload, loading: false };
    case GET_PRODUCT_FAIL:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
