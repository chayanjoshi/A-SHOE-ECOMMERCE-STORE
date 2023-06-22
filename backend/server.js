const app = require("./app");
const cloudinary = require("cloudinary");

// Handling uncaught exceptions/errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the serer due to Uncaught Exception.`);

  process.exit(1);
});

// Config
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

// Connecting To Database
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectDatabase = require("./config/database");
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the serer due to Unhandled Promise Rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
