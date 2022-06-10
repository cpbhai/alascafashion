const { isValidToken, fetchCart } = require("../middlewares/auth");

exports.cart = async function (req, res) {
  const user = isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  if (user) {
    res.render("pages/cart", { user, cart });
  } else {
    res.render("pages/cart", { cart, user });
  }
};
