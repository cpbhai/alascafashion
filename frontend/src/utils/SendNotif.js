import { SHOW_NOTIFICATION } from "../constants/design";

const SendNotif = (bg, msg) => {
  return { type: SHOW_NOTIFICATION, payload: { bg, msg } };
};

export default SendNotif;
