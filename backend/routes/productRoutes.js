const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const productValidator = require("../utils/validators/productValidator");

router.get("/", productController.getAllProducts);

router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  productController.uploadProductImage,
  productController.resizeProductImage,
  productValidator.createProductValidator,
  productController.createProduct
);

router
  .route("/:id")
  .get(productValidator.getProductValidator, productController.getProduct)
  .patch(
    productController.uploadProductImage,
    productController.resizeProductImage,
    productValidator.updateProductValidator,
    productController.updateProduct
  )
  .delete(
    productValidator.getProductValidator,
    productController.deleteProduct
  );

module.exports = router;
