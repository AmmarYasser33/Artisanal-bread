const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const cartPopOptions = [
  {
    path: "cartItems.product",
    select: "name price image category",
    populate: {
      path: "category",
      select: "name",
    },
  },
];

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
  return totalPrice;
};

exports.getUserCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    cartPopOptions
  );

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    data: cart,
  });
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  let [product, cart] = await Promise.all([
    Product.findById(productId),
    Cart.findOne({ user: req.user._id }),
  ]);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, quantity: 1, price: product.price }],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      cart.cartItems.push({
        product: productId,
        quantity: 1,
        price: product.price,
      });
    }
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(201).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    data: cart,
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateCartItemQuantity = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity = quantity;
  } else {
    return next(new ApiError("Item not found in cart", 404));
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    data: cart,
  });
});

exports.deleteCartItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: itemId } } },
    { new: true }
  );

  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    data: cart,
  });
});
