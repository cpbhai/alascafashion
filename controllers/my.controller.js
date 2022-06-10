const { isValidToken, fetchCart } = require("../middlewares/auth");

exports.cart = function (req, res) {
  const user = isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  if (user) {
    res.render("pages/cart", { user, cart });
  } else {
    res.render("pages/cart", { cart, user });
  }
};

exports.clearCart = function (req, res) {
  res.cookie("cart", JSON.stringify([]))
  const user = isValidToken([req.cookies.token], res);
  const cart = fetchCart(JSON.stringify([]), res);
  if (user) {
    res.render("pages/cart", { user, cart });
  } else {
    res.render("pages/cart", { cart, user });
  }
};
