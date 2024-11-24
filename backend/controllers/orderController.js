const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const ordersPopOptions = [
  // {
  //   path: "user",
  //   select: "name email phone photo",
  // },
];

const orderPopOptions = [
  {
    path: "user",
    select: "name email phone photo",
  },
  {
    path: "cartItems.product",
    select: "name price image",
  },
];

exports.filterUserOrders = (req, res, next) => {
  if (req.user.role === "user") req.query.user = req.user.id;

  next();
};

exports.getAllOrders = factory.getAll(
  Order,
  ordersPopOptions,
  "totalPrice orderDate status"
);
exports.getOrder = factory.getOne(Order, orderPopOptions);

exports.createCashOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartId);

  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  const [order] = await Promise.all([
    Order.create({
      user: req.user.id,
      cartItems: cart.cartItems,
      totalPrice: cart.totalPrice,
      orderName: req.body.orderName,
      orderPhone: req.body.orderPhone,
      orderAddress: req.body.orderAddress,
      orderDate: req.body.orderDate,
    }),

    Cart.findByIdAndDelete(req.params.cartId),
  ]);

  res.status(201).json({
    status: "success",
    data: order,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderData = { status };
  if (status === "delivered") orderData.deliveredAt = Date.now();

  const updatedOrder = await Order.findByIdAndUpdate(id, orderData, {
    new: true,
  });

  if (!updatedOrder) {
    return next(new ApiError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedOrder,
  });
});

exports.orderAgain = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const oldOrder = await Order.findById(id).lean();

  if (!oldOrder) {
    return next(new ApiError("Order not found", 404));
  }

  const order = await Order.create({
    user: req.user.id,
    cartItems: oldOrder.cartItems,
    totalPrice: oldOrder.totalPrice,
    orderName: oldOrder.orderName,
    orderPhone: oldOrder.orderPhone,
    orderAddress: oldOrder.orderAddress,
    orderDate: oldOrder.orderDate,
  });

  res.status(201).json({
    status: "success",
    data: order,
  });
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return next(new ApiError("Order not found", 404));
  }

  if (order.status === "cancelled") {
    return next(new ApiError("Order already cancelled", 400));
  }

  if (req.user.role === "user" && order.status !== "pending") {
    return next(new ApiError("Order cannot be cancelled", 400));
  }

  if (
    req.user.role === "admin" &&
    order.status !== "pending" &&
    order.status !== "processing"
  ) {
    return next(new ApiError("Order cannot be cancelled", 400));
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedOrder,
  });
});
