var nodemailer = require("nodemailer");

module.exports = function (mailOptions, cb) {
  var transporter = nodemailer.createTransport({
    service: "mandrillapp",
    auth: {
      user: "alascafashion@gmail.com",
      pass: "mgzxvrpoveffawxm",
    },
  });

  transporter.sendMail(
    mailOptions,
    cb
      ? cb
      : (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          return info.messageId;
        }
  );
};
