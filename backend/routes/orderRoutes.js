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
    orderValidator.updateOrderStatusValidator,
    orderController.updateOrderStatus
  );

module.exports = router;
