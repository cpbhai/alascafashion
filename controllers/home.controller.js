const { isValidToken } = require("../middlewares/auth");
module.exports = function (req, res) {
  const user = isValidToken(req.cookies.token, res);
  //   console.log(user);
  if (user) {
    res.render("pages/index", { user });
  } else {
    res.render("pages/index");
  }
};
