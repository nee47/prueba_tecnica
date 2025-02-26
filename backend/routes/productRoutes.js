const express = require("express");
const {
  createProduct,
  getProducts,
  downloadProductDS,
  getProductsWithPrice,
  downloadProductDSNoAuth,
} = require("../controllers/productController");

const { authVerification } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/createProduct", createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductsAuthenticated", authVerification, getProductsWithPrice);
router.get("/downloadDS/:ds", authVerification, downloadProductDS);
router.get("/downloadDSNoAuth/:ds", downloadProductDSNoAuth);

module.exports = router;
