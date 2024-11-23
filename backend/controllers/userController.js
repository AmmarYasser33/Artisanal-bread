const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.addAdmin = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    phoneVerified: true,
    role: "admin",
  });

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ApiError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, "name", "email", "phone", "address");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new ApiError("current password is wrong", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
