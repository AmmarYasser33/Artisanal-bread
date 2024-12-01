const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Course = require("../models/courseModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../utils/uploadImage");
const factory = require("./handlerFactory");

exports.getAllCourses = factory.getAll(Course);
exports.deleteCourse = factory.deleteOne(Course);
exports.getCourse = factory.getOne(Course, [], "-lessons");

exports.uploadCourseImage = uploadSingleImage("image");

exports.resizeCourseImage = catchAsync(async (req, res, next) => {
  if (!req.file && req.method === "PATCH") return next();
  if (!req.file) return next(new ApiError("Image is required", 400));

  if (req.file && req.file && req.file.buffer) {
    const filename = `course-${uuidv4()}.png`;

    await sharp(req.file.buffer)
      // .resize(500, 500)
      .toFormat("png")
      .png({ quality: 99 })
      .toFile(`uploads/courses/${filename}`);

    req.body.image = `/courses/${filename}`;
  }

  next();
});

exports.createCourse = factory.createOne(Course);
exports.updateCourse = factory.updateOne(Course);

exports.enrollUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const course = await Course.findById(id).select("_id").lean();

  if (!course) return next(new ApiError("Course not found", 404));

  await User.findByIdAndUpdate(userId, { $addToSet: { courses: course._id } });

  res.status(200).json({
    status: "success",
    message: "User enrolled successfully",
  });
});

exports.unEnrollUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const course = await Course.findById(id).select("_id").lean();

  if (!course) return next(new ApiError("Course not found", 404));

  await User.findByIdAndUpdate(userId, { $pull: { courses: course._id } });

  res.status(200).json({
    status: "success",
    message: "User un-enrolled successfully",
  });
});

exports.getCompletedCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;

  if (
    req.user &&
    req.user.role === "user" &&
    !req.user.courses.includes(courseId)
  ) {
    return next(new ApiError("You have not enrolled in this course", 401));
  }

  const selectedFields = req.user.role === "admin" ? "" : "lessons";

  const course = await Course.findById(courseId).select(selectedFields).lean();

  if (!course) return next(new ApiError("Course not found", 404));

  res.status(200).json({
    status: "success",
    data: course,
  });
});

exports.getMyCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({ _id: { $in: req.user.courses } }).lean();

  res.status(200).json({
    status: "success",
    data: courses,
  });
});
