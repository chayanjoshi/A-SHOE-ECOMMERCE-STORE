const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { isAuthenticatedUser } = require("../middleware/auth");

router.use(cookieParser());

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
