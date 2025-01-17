const { check } = require("express-validator");
const validatorMiddleware = require("./validatorMiddleware");

exports.createCourseValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("arTitle")
    .notEmpty()
    .withMessage("Arabic Title is required")
    .isString()
    .withMessage("Arabic Title must be a string")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  check("arDescription")
    .notEmpty()
    .withMessage("Arabic Description is required")
    .isString()
    .withMessage("Arabic Description must be a string")
    .trim(),

  check("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isString()
    .withMessage("Duration must be a string")
    .trim(),

  check("arDuration")
    .notEmpty()
    .withMessage("Duration in arabic is required")
    .isString()
    .withMessage("Duration in arabic must be a string")
    .trim(),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  check("video")
    .notEmpty()
    .withMessage("Video is required")
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Video must be a valid URL"),

  check("requirements")
    .isArray({ min: 1 })
    .withMessage("Requirements must be an array with at least one item"),

  check("requirements.*")
    .notEmpty()
    .withMessage("Requirement is required")
    .isString()
    .withMessage("Requirement must be a string")
    .trim(),

  check("arRequirements")
    .isArray({ min: 1 })
    .withMessage("Arabic Requirements must be an array with at least one item"),

  check("arRequirements.*")
    .notEmpty()
    .withMessage("Arabic Requirement is required")
    .isString()
    .withMessage("Requirement must be a string")
    .trim(),

  check("content")
    .isArray({ min: 1 })
    .withMessage("Content must be an array with at least one item"),

  check("content.*")
    .notEmpty()
    .withMessage("Content item is required")
    .isString()
    .withMessage("Content item must be a string")
    .trim(),

  check("arContent")
    .isArray({ min: 1 })
    .withMessage("Arabic Content must be an array with at least one item"),

  check("arContent.*")
    .notEmpty()
    .withMessage("Arabic Content item is required")
    .isString()
    .withMessage("Content item must be a string")
    .trim(),

  check("lessons")
    .isArray({ min: 1 })
    .withMessage("Lessons must be an array with at least one item"),

  check("lessons.*.title")
    .notEmpty()
    .withMessage("Lesson title is required")
    .isString()
    .withMessage("Lesson title must be a string")
    .trim(),

  check("lessons.*.arTitle")
    .notEmpty()
    .withMessage("Arabic Lesson title is required")
    .isString()
    .withMessage("Arabic Lesson title must be a string")
    .trim(),

  check("lessons.*.video")
    .notEmpty()
    .withMessage("Lesson video is required")
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Lesson video must be a valid URL"),

  validatorMiddleware,
];

exports.updateCourseValidator = [
  check("id")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),

  check("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  check("arTitle")
    .optional()
    .isString()
    .withMessage("Arabic Title must be a string")
    .trim(),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  check("arDescription")
    .optional()
    .isString()
    .withMessage("Arabic Description must be a string")
    .trim(),

  check("duration")
    .optional()
    .isString()
    .withMessage("Duration must be a string")
    .trim(),

  check("arDuration")
    .optional()
    .isString()
    .withMessage("Duration in arabic must be a string")
    .trim(),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  check("video")
    .optional()
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Video must be a valid URL"),

  check("requirements")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Requirements must be an array with at least one item"),

  check("requirements.*")
    .optional()
    .isString()
    .withMessage("Requirement must be a string")
    .trim(),

  check("arRequirements")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Arabic Requirements must be an array with at least one item"),

  check("arRequirements.*")
    .optional()
    .isString()
    .withMessage("Arabic Requirement must be a string")
    .trim(),

  check("content")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Content must be an array with at least one item"),

  check("content.*")
    .optional()
    .isString()
    .withMessage("Content item must be a string")
    .trim(),

  check("arContent")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Arabic Content must be an array with at least one item"),

  check("arContent.*")
    .optional()
    .isString()
    .withMessage("Arabic Content item must be a string")
    .trim(),

  check("lessons")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Lessons must be an array with at least one item"),

  check("lessons.*.title")
    .optional()
    .isString()
    .withMessage("Lesson title must be a string")
    .trim(),

  check("lessons.*.arTitle")
    .optional()
    .isString()
    .withMessage("Arabic Lesson title must be a string")
    .trim(),

  check("lessons.*.video")
    .optional()
    .isURL({
      allow_underscores: true,
      allow_trailing_dot: true,
      allow_numeric_tld: true,
      allow_wildcard: true,
      allow_protocol_relative_urls: true,
    })
    .withMessage("Lesson video must be a valid URL"),

  validatorMiddleware,
];

exports.getCourseValidator = [
  check("id")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),

  validatorMiddleware,
];

exports.enrollUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),

  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),

  validatorMiddleware,
];
