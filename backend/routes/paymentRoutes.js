const express = require("express");

const router = express.Router();
const protectRoute = require("../middlewares/auth.js");
const {
  stripeCheckOutSession,
} = require("../Controllers/paymentContollers.js");

//Routes
router.post(
  "/checkout_session",
  protectRoute.isAuthenticatedUser,
  stripeCheckOutSession
);

module.exports = router;
