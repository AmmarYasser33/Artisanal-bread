const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const orderValidator = require("../utils/validators/orderValidator");

router.use(authController.protect);

router.post(
  "/:cartId",
  authController.restrictTo("user"),
  orderValidator.createCashOrderValidator,
  orderController.createCashOrder
);

router.get("/", orderController.filterUserOrders, orderController.getAllOrders);

router.get("/:id", orderValidator.getOrderValidator, orderController.getOrder);

router.put(
  "/:id/pay",
  authController.restrictTo("admin"),
  orderValidator.getOrderValidator,
  orderController.updateOrderToPaid
);
router.put(
  "/:id/deliver",
  authController.restrictTo("admin"),
  orderValidator.getOrderValidator,
  orderController.updateOrderToDelivered
);

module.exports = router;
