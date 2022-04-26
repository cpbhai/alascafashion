import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  NO_USER,
  USER_DETAILS,
  LOGOUT_REQUEST,
  LOAD_USER,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/user";

export const user = (state = {}, action) => {
  switch (action.type) {
    case NO_USER:
      return { user: null };
    case USER_DETAILS:
      return { user: action.payload };
    case LOAD_USER:
    case LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        message: action.payload.message,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { loading: false, user: null, error: action.payload.error };
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
