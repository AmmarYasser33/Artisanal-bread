const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Chef = require("../models/chefModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../utils/uploadImage");

exports.getAllChefs = factory.getAll(Chef);

exports.uploadChefImage = uploadSingleImage("image");

exports.resizeChefImage = catchAsync(async (req, res, next) => {
  if (!req.file && req.method === "PATCH") return next();
  if (!req.file) return next(new ApiError("Image is required", 400));

  if (req.file && req.file && req.file.buffer) {
    const filename = `chef-${uuidv4()}.png`;

    await sharp(req.file.buffer)
      // .resize(500, 500)
      .toFormat("png")
      .png({ quality: 99 })
      .toFile(`uploads/chefs/${filename}`);

    req.body.image = `/chefs/${filename}`;
  }

  next();
});

exports.updateChef = factory.updateOne(Chef);
