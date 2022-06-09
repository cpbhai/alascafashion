const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/home.controller"));
router.use("/auth", require("./user.routes"));
router.use("/collection", require("./product.routes"));

module.exports = router;
