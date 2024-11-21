const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.createCashOrderValidator = [
  check("cartId")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isMongoId()
    .withMessage("Cart ID must be a valid Mongo ID"),

  check("orderName")
    .notEmpty()
    .withMessage("Order name is required")
    .isString()
    .withMessage("Order name must be a string"),

  check("orderPhone")
    .notEmpty()
    .withMessage("Order phone is required")
    .isMobilePhone()
    .withMessage("Order phone must be a valid phone number"),

  check("orderAddress")
    .notEmpty()
    .withMessage("Order address is required")
    .isString()
    .withMessage("Order address must be a string"),

  check("orderDate")
    .notEmpty()
    .withMessage("Order date is required")
    .isISO8601()
    .withMessage("Order date must be a valid date in the format YYYY-MM-DD")
    .isAfter(new Date(Date.now() + 24 * 60 * 60 * 1000).toString())
    .withMessage("Order date must be after 24 hours from now"),

  // NOT ALLOWED

  check("user").not().exists().withMessage("User cannot be set"),

  check("isPaid").not().exists().withMessage("isPaid cannot be set"),

  check("paidAt").not().exists().withMessage("paidAt cannot be set"),

  check("isDelivered").not().exists().withMessage("isDelivered cannot be set"),

  check("deliveredAt").not().exists().withMessage("deliveredAt cannot be set"),

  check("orderItems").not().exists().withMessage("Order items cannot be set"),

  validatorMiddleware,
];

exports.getOrderValidator = [
  check("id")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Order ID must be a valid Mongo ID"),

  validatorMiddleware,
];
