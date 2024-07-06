import React, { useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useStripeCheckOutSessionMutation,
} from "../../redux/api/orderApi";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";

const ProceedPayment = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();
  const [
    StripeCheckOutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckOutSessionMutation();

  useEffect(() => {
    if (checkoutData) window.location.href = checkoutData?.url;

    if (checkoutError) {
      Toastify({
        text: checkoutError?.data?.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
    }
  }, [checkoutData, , checkoutError]);

  const errorMessage = error?.data?.message.error;
  console.log(errorMessage);

  useEffect(() => {
    if (error) {
      Toastify({
        text: errorMessage,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
    }
    if (isSuccess) {
      Toastify({
        text: "order Accepted",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);



  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItem);

    if (method === "COD") {
      //create Cod order

      const orderData = {
        shippingInfo,
        orderItems: cartItem,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    }

    if (method === "Card") {
      //stripe Checkout

      const orderData = {
        shippingInfo,
        orderItems: cartItem,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };
      StripeCheckOutSession(orderData);
    }
  };

  

  return (
    <>
      <CheckOutSteps shippingInfo confirmOrder proceedPayment />
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
            onSubmit={submitHandler}
          >
            <h2 class="mb-4">Select Payment Method</h2>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label class="form-check-label" for="codradio">
                Cash on Delivery
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label class="form-check-label" for="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              class="btn py-2 w-100"
              disabled={isLoading}
            >
              {isLoading ? "Connecting" : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProceedPayment;
