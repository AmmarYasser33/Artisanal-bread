const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");
const cartValidator = require("../utils/validators/cartValidator");

router.use(authController.protect, authController.restrictTo("user"));

router
  .route("/")
  .get(cartController.getUserCart)
  .post(
    cartValidator.addProductToCartValidator,
    cartController.addProductToCart
  )
  .delete(cartController.clearCart);

router
  .route("/:itemId")
  .put(
    cartValidator.updateCartItemQuantityValidator,
    cartController.updateCartItemQuantity
  )
  .delete(cartValidator.deleteCartItemValidator, cartController.deleteCartItem);

module.exports = router;
