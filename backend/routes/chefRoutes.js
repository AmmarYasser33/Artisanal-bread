const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const chefController = require("../controllers/chefController");
const chefValidator = require("../utils/validators/chefValidator");

router.get("/", chefController.getAllChefs);

router.use(authController.protect, authController.restrictTo("admin"));

router.patch(
  "/:id",
  chefController.uploadChefImage,
  chefController.resizeChefImage,
  chefValidator.updateChefValidator,
  chefController.updateChef
);

module.exports = router;
