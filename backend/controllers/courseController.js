const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../utils/uploadImage");
const factory = require("./handlerFactory");

exports.getAllCourses = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.deleteCourse = factory.deleteOne(Course);

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
