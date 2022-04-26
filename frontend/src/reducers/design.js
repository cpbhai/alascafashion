import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SHOW_SIDE_PANEL,
  HIDE_SIDE_PANEL,
  LOAD_CART,
  ADD_TO_CART,
  CLEAR_CART,
} from "../constants/design";

export const design = (state = {}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        enableNotif: true,
        data: action.payload,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        enableNotif: false,
        data: null,
      };
    case SHOW_SIDE_PANEL:
      return {
        ...state,
        enableSidePanel: true,
      };
    case HIDE_SIDE_PANEL:
      return {
        ...state,
        enableSidePanel: false,
      };
    case LOAD_CART:
    case ADD_TO_CART:
    case CLEAR_CART:
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};
