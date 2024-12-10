const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: Number,
    orderName: String,
    orderPhone: String,
    orderAddress: String,
    orderDate: {
      type: Date,
      default: Date.now() + 24 * 60 * 60 * 1000,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "processing"],
      default: "pending",
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
