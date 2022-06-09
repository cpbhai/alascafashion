const { isValidToken, fetchCart } = require("../middlewares/auth");
const { get } = require("./product.controller");
const productModel = require("../models/product.model");

module.exports = async function (req, res) {
  const user = isValidToken(req.cookies.token, res);
  const cart = fetchCart(req.cookies.cart, res);
  const products = await productModel.find().sort({ createdAt: -1 }).limit(10);
  //   console.log(user);
  if (user) {
    res.render("pages/index", { user, cart, products });
  } else {
    res.render("pages/index", { cart, products });
  }
};
