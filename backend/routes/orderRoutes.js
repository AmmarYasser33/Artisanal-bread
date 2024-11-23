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

router
  .route("/:id")
  .get(
    orderValidator.getOrderValidator,
    orderController.filterUserOrders,
    orderController.getOrder
  )
  .put(
    authController.restrictTo("admin"),
    orderValidator.updateOrderStatusValidator,
    orderController.updateOrderStatus
  )
  .delete(
    orderValidator.getOrderValidator,
    orderController.filterUserOrders,
    orderController.cancelOrder
  );

router.post(
  "/:id/again",
  authController.restrictTo("user"),
  orderValidator.getOrderValidator,
  orderController.orderAgain
);

module.exports = router;
