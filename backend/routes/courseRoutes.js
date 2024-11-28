const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const courseValidator = require("../utils/validators/courseValidator");

router.get("/", courseController.getAllCourses);
router.get(
  "/:id",
  courseValidator.getCourseValidator,
  courseController.getCourse
);

router.use(authController.protect, authController.restrictTo("admin"));

router.post(
  "/",
  courseController.uploadCourseImage,
  courseController.resizeCourseImage,
  courseValidator.createCourseValidator,
  courseController.createCourse
);

router
  .route("/:id")
  // .get(courseValidator.getCourseValidator, courseController.getCourse)
  .patch(
    courseController.uploadCourseImage,
    courseController.resizeCourseImage,
    courseValidator.updateCourseValidator,
    courseController.updateCourse
  )
  .delete(courseValidator.getCourseValidator, courseController.deleteCourse);

module.exports = router;
