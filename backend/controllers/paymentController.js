const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")("sk_test_51NDqJXSCXzMdbNwckA31k4vZusl9BX5jW4Za4N4iIGTGMrAcdhurBZ06ZNXFUYYltkuYKEeagEQG0zTVo2Xd0d3r00Gzev2W2j"); //(process.env.STRIPE_SECRET_KEY)

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
