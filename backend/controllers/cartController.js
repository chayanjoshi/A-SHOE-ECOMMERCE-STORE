const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const productModel = require("../models/productModel");
// const productModel = require("../models/productModel");

exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  res.status(201).json({
    success: true,
    cart,
  });
});

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const id = req.body.id;
  let cart = await Cart.findOne({ userId: req.user._id });
  let cartProduct = await Cart.findOne({ productId: id });
  const type = req.body.type;
  const user = req.user._id;
  // let products = cart.items;
  // let totalAmount = 0;/

  // products.forEach(totalAmount);

  if (cart) {
    let itemIndex = cart.items.findIndex((p) => p.productId == id);
    let quantity = 1;

    if (itemIndex > -1) {
      cart.items[itemIndex].type = req.body.type;
      let productItem = cart.items[itemIndex];
      // let quantity = 1;
      // let prevAmount = cartProduct.price;

      if (req.body.type === "increment") {
        productItem.quantity = quantity + productItem.quantity;
        productItem.totalPrice = productItem.quantity * productItem.price;
        productItem.type = req.body.type;
        cart.items[itemIndex] = productItem;

        // await cart.save({ validateBeforeSave: false });
      } else if (
        req.body.type === "decrement" &&
        productItem.quantity > 1 &&
        productItem.totalPrice >= 0
      ) {
        productItem.quantity = productItem.quantity - quantity;
        productItem.totalPrice = productItem.quantity * productItem.price;
        productItem.type = req.body.type;
        cart.items[itemIndex] = productItem;

        // await cart.save({ validateBeforeSave: false });
      } else {
        return next(new errorHandler("This Request Can't Be Processed.", 400));
      }

      await cart.save({ validateBeforeSave: false });

      res.status(201).json({
        success: true,
        cart,
      });
    } else {
      const product = await Product.findById(req.body.id);

      const { _id, name, price, rating, images } = product;

      let quantity = 1;
      cart.items.push({ productId: _id, quantity, name, price, type });
    }

    cart = await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } else {
    const product = await Product.findById(req.body.id);

    const { _id, name, price, rating, images } = product;

    let quantity = 1;

    //no cart for user, create new cart
    const newCart = await Cart.create({
      userId: user,
      items: [{ productId: _id, quantity, name, price, type }],
    });

    return res.status(201).send(newCart);
  }
});

async function totalAmount(item, index) {
  let totalAmount = 0;
  totalAmount += item.price;
}

exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  const userCart = await Cart.findOneAndDelete({ userId: req.user._id });

  res.status(200).json({ cart: userCart });
});
