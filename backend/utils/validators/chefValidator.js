const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.updateChefValidator = [
  check("id")
    .exists()
    .withMessage("Chef ID is required")
    .isMongoId()
    .withMessage("Invalid Chef ID"),

  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  check("facebook")
    .optional()
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Facebook must be a valid URL"),

  check("instagram")
    .optional()
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Instagram must be a valid URL"),

  check("whatsapp")
    .optional()
    .isMobilePhone()
    .withMessage("Whatsapp must be a valid phone number"),

  check("twitter")
    .optional()
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Twitter must be a valid URL"),

  validatorMiddleware,
];
