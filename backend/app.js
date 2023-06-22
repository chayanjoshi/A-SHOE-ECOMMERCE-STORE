const express = require("express");
// const cookieParser = require("cookie-parser");

const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());
// app.use(cookieParser());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const cart = require("./routes/cartRoute");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", cart);

// Middleware For Errors
app.use(errorMiddleware);

module.exports = app;
