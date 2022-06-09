const express = require("express");
const router = express.Router();
const infoController = require("../controllers/info.controller");

router.get("/about-us", infoController.about);

module.exports = router;
