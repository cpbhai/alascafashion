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

export const catandsubcat = (state = {}, action) => {
  switch (action.type) {
    case GET_CATS_REQUEST:
    case GET_SUBCATS_REQUEST:
      return { ...state, loading: true };
    case GET_CATS_SUCCESS:
      return { ...state, cats: action.payload };
    case GET_SUBCATS_SUCCESS:
      return { ...state, subcats: action.payload };
    case GET_CATS_FAIL:
      return { ...state, cats: null };
    case GET_SUBCATS_FAIL:
      return { ...state, subcats: null };
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
