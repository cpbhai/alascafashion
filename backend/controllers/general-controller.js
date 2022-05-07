exports.visitorMail = async (req, res) => {
  try {
    const errorResponse = require("../utils/errorResponse");
    const sendEmail = require("../utils/sendEmail");
    sendEmail("visitor", {
      type: req.params.type,
      email: "alascafashion@gmail.com",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
