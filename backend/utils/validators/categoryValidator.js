const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  check("name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),

  validatorMiddleware,
];

exports.getCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  validatorMiddleware,
];
