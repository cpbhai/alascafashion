const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/home.controller"));
router.use("/auth", require("./user.routes"));
router.use("/collection", require("./product.routes"));

router.use("/info", require("./info.routes"));

router.use("/my", require("./my.routes"));//my/cart, my/profile, my/orders

module.exports = router;
