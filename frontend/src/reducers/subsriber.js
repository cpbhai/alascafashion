import {
  ADD_SUBSCRIBER_REQUEST,
  ADD_SUBSCRIBER_SUCCESS,
  ADD_SUBSCRIBER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/subscriber";

export const subscriber = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER_REQUEST:
      return { loading: true };
    case ADD_SUBSCRIBER_SUCCESS:
      return { message: action.payload, loading: false };
    case ADD_SUBSCRIBER_FAIL:
      return { error: action.payload, loading: false };
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
