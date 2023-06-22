const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
} = require("../controllers/cartController");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/cart")
  .get(isAuthenticatedUser, getCart)
  .post(isAuthenticatedUser, addToCart)
  .delete(isAuthenticatedUser, clearCart);

// router
//   .route("/cart/:id")
//   .delete(isAuthenticatedUser, removeFromCart)
//   .patch(isAuthenticatedUser, changeQuantity);

module.exports = router;
