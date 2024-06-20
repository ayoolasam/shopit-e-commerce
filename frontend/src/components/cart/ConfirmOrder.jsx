import React from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { shippingInfo, cartItem } = useSelector((state) => state.cart);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItem);

  const proceedPayment = () => {
    navigate("/proceedPayment");
  };
  return (
    <>
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8 mt-5 order-confirm">
          <h4 class="mb-3">Shipping Info</h4>
          <p>
            <b>Name: {user?.name}</b>
          </p>
          <p>
            <b>Phone:</b>
            {shippingInfo.phone}
          </p>
          <p class="mb-4">
            <b>Address:</b> {shippingInfo.address},{shippingInfo.city},
            {shippingInfo.country},{shippingInfo.zipCode}
          </p>

          <hr />
          <h4 class="mt-4">Your Cart Items:</h4>
          {cartItem?.map((item) => {
            return (
              <>
                <hr />
                <div class="cart-item my-1">
                  <div class="row">
                    <div class="col-4 col-lg-2">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div class="col-5 col-lg-6">
                      <Link to={`${item.product}`}>{item?.name}</Link>
                    </div>

                    <div class="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item?.quantity}x {item?.price}={" "}
                        <b>{(item?.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>

        <div class="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span class="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span class="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span class="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span class="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <a
              href="/proceedPayment"
              id="checkout_btn"
              class="btn btn-primary w-100"
              onClick={proceedPayment}
            >
              Proceed to Payment
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
