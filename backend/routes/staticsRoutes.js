const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const staticsController = require("../controllers/staticsController");

router.use(authController.protect, authController.restrictTo("admin"));

router.route("/").get(staticsController.getStatics);

module.exports = router;
