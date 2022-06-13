const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/order.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/place", isAuthenticated, authorizeRoles("Client"), placeOrder);

module.exports = router;
