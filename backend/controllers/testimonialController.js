const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Testimonial = require("../models/testimonialModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../utils/uploadImage");

exports.getAllTestimonials = factory.getAll(Testimonial);
exports.deleteTestimonial = factory.deleteOne(Testimonial);

exports.uploadTestimonialImage = uploadSingleImage("image");

exports.resizeTestimonialImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  if (req.file && req.file.buffer) {
    const filename = `testimonial-${uuidv4()}.png`;

    await sharp(req.file.buffer)
      // .resize(500, 500)
      .toFormat("png")
      .png({ quality: 99 })
      .toFile(`uploads/testimonials/${filename}`);

    req.body.image = `/testimonials/${filename}`;
  }

  next();
});

exports.addTestimonial = factory.createOne(Testimonial);
exports.updateTestimonial = factory.updateOne(Testimonial);
