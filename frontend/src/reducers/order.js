import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_MESSAGES,
  CLEAR_ERRORS,
} from "../constants/order";

export const order = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, message: action.payload, loading: false };
    case MY_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, loading: false };
    case CREATE_ORDER_FAIL:
      return { ...state, error: action.payload, loading: false };
    case MY_ORDERS_FAIL:
      return { ...state, orders: [], loading: false };
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
