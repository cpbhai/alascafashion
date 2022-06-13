const { isValidToken, fetchCart } = require("../middlewares/auth");

exports.about = async function (req, res) {
  const user = await isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  if (user) {
    res.render("pages/about", { user, cart });
  } else {
    res.render("pages/about", { cart, user });
  }
};
