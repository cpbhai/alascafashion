const { isValidToken, fetchCart } = require("../middlewares/auth");
const { get } = require("./product.controller");
module.exports = async function (req, res) {
  const user = isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  const products = await get(req, res, true);
  //   console.log(user);
  if (user) {
    res.render("pages/index", { user, cart, products });
  } else {
    res.render("pages/index", { cart, products });
  }
};
