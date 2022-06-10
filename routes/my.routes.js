const express = require("express");
const router = express.Router();
const myController = require("../controllers/my.controller");

router.get("/cart", myController.cart);
router.post("/cart", myController.clearCart);

module.exports = router;
