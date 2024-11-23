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
    select: "name price",
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
