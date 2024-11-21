const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.addProductToCartValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  validatorMiddleware,
];

exports.updateCartItemQuantityValidator = [
  check("itemId")
    .notEmpty()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Invalid item ID"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  validatorMiddleware,
];

exports.deleteCartItemValidator = [
  check("itemId")
    .notEmpty()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Invalid item ID"),

  validatorMiddleware,
];
