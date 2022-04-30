const express = require("express");
const router = express.Router();
const {
  addProduct,
  get,
  specific,
  deleteProduct,
  updateProduct,
} = require("../controllers/product-controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

router.post("/add", isAuthenticated, authorizeRoles("Supplier"), addProduct);
router.get("/get", get);
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
router.get("/:_id", specific);
module.exports = router;
