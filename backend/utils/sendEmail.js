const SendEmail = require("../services/email");
const EmailTemplate = require("../services/email-template");

module.exports = (templateId, payload) => {
  let template = { subject: "", body: "" };
  switch (templateId) {
    case "signup":
      template = EmailTemplate.userSignup(payload.email, payload.password);
      break;
    case "new-product":
      template = EmailTemplate.newProduct(payload.product);
      break;
    default:
      console.log("W");
  }

  let mailOptions = {
    to: payload.email,
    subject: template.subject,
    html: template.body,
  };
  // payload.bcc == undefined ? "" : payload.bcc
  console.log("Sending mail to:", payload.email);
  SendEmail(mailOptions);
};
