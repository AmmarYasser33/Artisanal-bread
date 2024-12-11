const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { uploadSingleImage } = require("../utils/uploadImage");
const factory = require("./handlerFactory");

const productPopOptions = [
  {
    path: "category",
    select: "arName enName",
  },
];

exports.getAllProducts = factory.getAll(Product, productPopOptions);
exports.getProduct = factory.getOne(Product, productPopOptions);
exports.deleteProduct = factory.deleteOne(Product);

exports.uploadProductImage = uploadSingleImage("image");

exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file && req.method === "PATCH") return next();
  if (!req.file) return next(new ApiError("Image is required", 400));

  if (req.file && req.file && req.file.buffer) {
    const filename = `product-${uuidv4()}.png`;

    await sharp(req.file.buffer)
      // .resize(500, 500)
      .toFormat("png")
      .png({ quality: 99 })
      .toFile(`uploads/products/${filename}`);

    req.body.image = `/products/${filename}`;
  }

  next();
});

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
