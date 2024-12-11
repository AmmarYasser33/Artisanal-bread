const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.createCategoryValidator = [
  check("arName")
    .notEmpty()
    .withMessage("Category Arabic name is required")
    .isString()
    .withMessage("Category Arabic name must be a string"),

  check("enName")
    .notEmpty()
    .withMessage("Category English name is required")
    .isString()
    .withMessage("Category English name must be a string"),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),

  check("arName")
    .optional()
    .isString()
    .withMessage("Category Arabic name must be a string"),

  check("enName")
    .optional()
    .isString()
    .withMessage("Category English name must be a string"),

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
