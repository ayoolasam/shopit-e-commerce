import React from "react";
import { useGetorderDetailsQuery } from "../../redux/api/orderApi";
import { Link, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useEffect } from "react";

const OrderDetails = () => {
  const params = useParams();

  const { data, isLoading, error } = useGetorderDetailsQuery(params?.id);

  const order = data?.order || {};

  console.log(order);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
    paymentMethod,
  } = order;
  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() => {
    if (error) {
      Toastify({
        text: error?.data?.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
    }
  }, [error]);
  return (
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-lg-9 mt-5 order-details">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="mt-5 mb-4">Your Order Details</h3>
          <a class="btn btn-success" href="/invoice/order/order-id">
            <i class="fa fa-print"></i> Invoice
          </a>
        </div>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td
                class={
                  String(orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>{new Date(order?.createdAt).toLocaleString("en-Us")}</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 mb-4">Shipping Info</h3>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>
                {shippingInfo?.address},{shippingInfo?.city},
                {shippingInfo?.country}.{shippingInfo?.zipCode}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 mb-4">Payment Info</h3>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td class={isPaid ? "greenColor" : "redColor"}>
                <b>{paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>{paymentInfo?.id || "Not Available"}</td>
            </tr>
            <tr>
              <th scope="row">Amount Paid</th>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 my-4">Order Items:</h3>

        <hr />
        <div class="cart-item my-1">
          {orderItems?.map((item) => {
            return (
              <div class="row my-5">
                <div class="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div class="col-5 col-lg-5">
                  <Link to={`/${item?._id}`}>{item?.name}</Link>
                </div>

                <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>{item?.price}</p>
                </div>

                <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderDetails;
