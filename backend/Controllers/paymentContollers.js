//create Stripe checkout Session => /api/v1/payment/checkout_session

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const Order = require("../Models/order");

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

  //SESSION CREATION
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/me/orders`,
    cancel_url: `${process.env.FRONTEND_URL}`,
    customer_email: req?.user?.email,
    client_reference_id: req?.user?._id.toString(),
    mode: "payment",
    metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
    shipping_options: [
      {
        shipping_rate,
      },
    ],
    line_items,
  });

  //RESPONSE
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

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });
      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

// Create new order in the database after payment successfull
exports.stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if ((event.type = "checkout.session.completed")) {
      const session = event.data.object;
      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;
      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;
      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        phone: session.metadata.phone,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };
      const paymentInfo = {
        id: session.payment_intext,
        stat: session.payment_status,
      };
      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "CARD",
        user,
      };

      await Order.create(orderData);

      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.log("Error => ", err);
  }
});
