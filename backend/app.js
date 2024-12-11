const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes.js");
const ErrorMiddleware = require("../backend/middlewares/errors.js");
const authRoutes = require("./routes/authRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");

app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "https://shopit-e-commerce.vercel.app",
      "https://jobs-with-vuejs.vercel.app",
    ], // Replace with your frontend's actual domain
    credentials: true, // This allows cookies to be sent and received
  })
);

process.on("uncaughtException", (err) => {
  console.log(`ERROR:${err}`);
  console.log("shtting down due uncaught exceptions");
  process.exit(1);
});
app.use(mongoSanitize());
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(cookieParser());

const DB = process.env.MONGO_DB;
mongoose.connect(DB).then(() => {
  console.log("database Connected");
});

app.use("/api/v1/", productRoutes);

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", paymentRoutes);

app.use(ErrorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
