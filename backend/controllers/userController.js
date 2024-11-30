const mongoose = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
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

exports.setMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);

exports.addAdmin = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.name.split(" ")[0],
    lastName: req.body.name.split(" ")[1] || "",
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

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "phone",
    "address"
  );

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

exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).lean();

  if (!user) {
    return next(new ApiError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const getUserPromise = User.findById(userId).lean();

  const ordersAggregatePromise = Order.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(String(userId)) } },
    {
      $group: {
        _id: "$user",
        totalOrders: { $sum: 1 }, // Count all orders
        totalPaid: {
          // Sum all orders price that are not cancelled
          $sum: {
            $cond: [{ $ne: ["$status", "cancelled"] }, "$totalPrice", 0],
          },
        },
      },
    },
  ]);

  const [user, ordersAggregate] = await Promise.all([
    getUserPromise,
    ordersAggregatePromise,
  ]);

  if (!user) {
    return next(new ApiError("No user found with that ID", 404));
  }

  const [{ totalOrders, totalPaid }] = ordersAggregate;

  res.status(200).json({
    status: "success",
    data: {
      totalOrders,
      totalPaid,
      user,
    },
  });
});
