const express = require("express");
const router = express.Router();
const { visitorMail } = require("../controllers/general-controller.js");

router.post("/visitor/:type", visitorMail);

module.exports = router;
