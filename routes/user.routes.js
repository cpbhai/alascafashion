const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.get("/register", userController.registerPage);
router.post("/login", userController.login);
router.get("/login", userController.loginPage);
router.post("/logout", userController.logout);

module.exports = router;
