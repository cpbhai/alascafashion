import axios from "axios";
import { BASE_URL } from "./config";
const sendEmail = (key) => {
  axios({
    method: "post",
    url: `${BASE_URL}general/visitor/${key}`,
  });
};
export default sendEmail;
