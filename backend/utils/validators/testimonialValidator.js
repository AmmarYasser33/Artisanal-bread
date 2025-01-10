const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.validateAddTestimonial = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name cannot be empty"),

  check("title")
    .exists()
    .withMessage("Title is required")
    .notEmpty()
    .withMessage("Title cannot be empty"),

  check("comment")
    .exists()
    .withMessage("Comment is required")
    .notEmpty()
    .withMessage("Comment cannot be empty"),

  validatorMiddleware,
];

exports.validateUpdateTestimonial = [
  check("id")
    .exists()
    .withMessage("Testimonial ID is required")
    .isMongoId()
    .withMessage("Invalid Testimonial ID"),

  check("name").optional().notEmpty().withMessage("Name cannot be empty"),

  check("title").optional().notEmpty().withMessage("Title cannot be empty"),

  check("comment").optional().notEmpty().withMessage("Comment cannot be empty"),

  validatorMiddleware,
];

exports.validateGetTestimonial = [
  check("id")
    .exists()
    .withMessage("Testimonial ID is required")
    .isMongoId()
    .withMessage("Invalid Testimonial ID"),

  validatorMiddleware,
];
