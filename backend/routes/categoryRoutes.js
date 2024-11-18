const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");
const categoryValidator = require("../utils/validators/categoryValidator");

router.get("/", categoryController.getAllCategories);

router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  categoryValidator.createCategoryValidator,
  categoryController.createCategory
);

router
  .route("/:id")
  .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
  .patch(
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory
  )
  .delete(
    categoryValidator.getCategoryValidator,
    categoryController.deleteCategory
  );

module.exports = router;
