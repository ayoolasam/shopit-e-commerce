import React from "react";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useEffect } from "react";

const OrderDetails = () => {
  const params = useParams();

  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  console.log(params?.id);
  const order = data?.order;
  console.log(order);

  const {
    shippingInfo,
    OrderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

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
              <td>{order?.id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td class="greenColor">
                <b>Delivered</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>October 1, 2023, 10:30 AM</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 mb-4">Shipping Info</h3>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>John Doe</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>+1 123-456-7890</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>123 Main Street, City, Postal Code, Country</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 mb-4">Payment Info</h3>
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td class="greenColor">
                <b>PAID</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>Credit Card</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>stripe-id</td>
            </tr>
            <tr>
              <th scope="row">Amount Paid</th>
              <td>$250.00</td>
            </tr>
          </tbody>
        </table>

        <h3 class="mt-5 my-4">Order Items:</h3>

        <hr />
        <div class="cart-item my-1">
          <div class="row my-5">
            <div class="col-4 col-lg-2">
              <img
                src="../images/product.jpg"
                alt="Product Name"
                height="45"
                width="65"
              />
            </div>

            <div class="col-5 col-lg-5">
              <a href="/products/product-id">Product Name</a>
            </div>

            <div class="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>$50.00</p>
            </div>

            <div class="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>2 Piece(s)</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderDetails;
