const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.createProductValidator = [
  check("enName")
    .notEmpty()
    .withMessage("English name is required")
    .isString()
    .withMessage("English name must be a string")
    .isLength({ min: 2 })
    .withMessage("English name must be at least 2 characters long")
    .trim(),

  check("arName")
    .notEmpty()
    .withMessage("Arabic name is required")
    .isString()
    .withMessage("Arabic name must be a string")
    .isLength({ min: 2 })
    .withMessage("Arabic name must be at least 2 characters long")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),

  check("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id"),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Invalid product id"),

  check("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  check("category").optional().isMongoId().withMessage("Invalid category id"),

  check("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  validatorMiddleware,
];
