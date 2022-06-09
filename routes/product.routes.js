const express = require("express");
const router = express.Router();
const {
  addProduct,
  get,
  specific,
  deleteProduct,
  updateProduct,
  addToCart
} = require("../controllers/product.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/add", isAuthenticated, authorizeRoles("Supplier"), addProduct);
router.get("/products", get);
router.put(
  "/update/:_id",
  isAuthenticated,
  authorizeRoles("Supplier"),
  updateProduct
);
router.delete(
  "/delete/:_id",
  isAuthenticated,
  authorizeRoles("Supplier"),
  deleteProduct
);
router.get("/product/:_id", specific);
router.post("/product/:_id", addToCart);
module.exports = router;
