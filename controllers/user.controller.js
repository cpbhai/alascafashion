const User = require("../models/user.model");
const { isValidToken, fetchCart } = require("../middlewares/auth");

exports.loginPage = (req, res) => {
  const cart = fetchCart(req.cookies.cart, res);
  if (isValidToken(req.cookies.token, res)) {
    return res.redirect("/");
  }
  res.render("pages/login", { cart });
};
exports.login = async (req, res) => {
  let errors = [];
  try {
    const { ID, password } = req.body;
    if (!ID) errors.push("Email or Phone is missing");
    if (!password) errors.push("Password is missing");
    if (errors.length) throw null;
    let Filter = {};
    if (ID.includes("@")) Filter.email = ID;
    else Filter.phone = ID;
    const user = await User.findOne(Filter).select("+password");
    if (!user) {
      throw errors.push("No such User found");
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw errors.push("No such User found");
    if (errors.length) throw null;
    const token = user.getJWTToken();
    res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("pages/login", { errors, formValues: req.body });
  }
};
exports.registerPage = (req, res) => {
  const cart = fetchCart(req.cookies.cart, res);
  if (isValidToken(req.cookies.token, res)) {
    return res.redirect("/");
  }
  res.render("pages/register", { cart });
};
exports.register = async (req, res) => {
  let errors = [];
  try {
    const { name, email, phone, password } = req.body;
    if (!name) errors.push("Name is missing");
    if (!email) errors.push("Email is missing");
    if (!password) errors.push("Password is missing");
    if (password && password.length < 6)
      errors.push("Password must be atleast 6 chars. Long");
    if (!phone) errors.push("Phone is missing");
    if (phone && phone.length != 10) errors.push("phone must be 10 digit Long");
    if (errors.length) throw null;
    const user = await User.create(req.body);
    const token = user.getJWTToken();
    res.cookie("token", token).redirect("/");
  } catch (err) {
    if (err?.code == 11000)
      errors = [`${Object.values(err.keyValue)[0]} already exists`];
    res.render("pages/register", { errors, formValues: req.body });
  }
};
exports.logout = (req, res) => {
  res.cookie("token", null);
  res.redirect("/auth/login");
};
// exports.login=(req, res)=>{}
