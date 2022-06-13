const { isValidToken, fetchCart } = require("../middlewares/auth");

exports.cart = async function (req, res) {
  const user = await isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  res.render("pages/cart", { user, cart });
};

exports.clearCart = async function (req, res) {
  res.cookie("cart", JSON.stringify([]));
  const user = await isValidToken(req.cookies.token, res);
  const cart = fetchCart(JSON.stringify([]), res);
  res.render("pages/cart", { user, cart });
};
