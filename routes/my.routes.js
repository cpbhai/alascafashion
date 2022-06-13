const express = require("express");
const router = express.Router();
const myController = require("../controllers/my.controller");

router.get("/cart", myController.cart);
router.post("/cart", myController.clearCart);
// router.get("/orders", myController.cart);

module.exports = router;
