const express = require("express");
const router = express.Router();
const {
  addProduct,
  addProductPage,
  get,
  specific,
  prodData,
  deleteProduct,
  updateProduct,
  addToCart,
} = require("../controllers/product.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.get("/add", isAuthenticated, authorizeRoles("Supplier"), addProductPage);
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
router.get("/product-data/:_id", prodData);
router.post("/product/:_id", addToCart);
module.exports = router;
