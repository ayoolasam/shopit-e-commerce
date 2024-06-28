const express = require("express");

const router = express.Router();
const protectRoute = require("../middlewares/auth.js");
const {
  stripeCheckOutSession,
  stripeWebhook
} = require("../Controllers/paymentContollers.js");

//Routes
router.post(
  "/checkout_session",
  protectRoute.isAuthenticatedUser,
  stripeCheckOutSession
);
router.post(
  "/payment/webhook",
stripeWebhook
);

module.exports = router;
