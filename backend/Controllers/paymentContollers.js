//create Stripe checkout Session => /api/v1/payment/checkout_session

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.stripeCheckOutSession = catchAsyncErrors(async (req, res, next) => {
  const body = req?.body;

  const shippingInfo = body?.shippingInfo;

  const shipping_rate =
    body?.itemsPrice >= 200
      ? "shr_1PU53n2KXa3td4Yw1WvOUT4p"
      : "shr_1PU54C2KXa3td4YwyM19lTjo";

  const line_items = body?.orderItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          images: [item?.image],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: ["txr_1PU5Cf2KXa3td4Yw8f25toFX"],
      quantity: item?.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id.toString(),
    mode: "payment",
    metadata: { ...shippingInfo, itemPrice: body?.itemsPrice },
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
  });
  console.log(session);

  res.status(200).json({
    url: session.url,
  });
  try {
  } catch (err) {
    res.status(401).json({
      message: {
        error,
      },
    });
  }
});
