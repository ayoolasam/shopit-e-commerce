import React from "react";
import MetaData from "../layout/MetaData";
import "./invoice.css";
import { useGetorderDetailsQuery } from "../../redux/api/orderApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error, isSuccess } = useGetorderDetailsQuery(
    params?.id
  );
  const order = data?.order || {};

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`invoice_${order?._id}`);
    });
  };
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
    paymentMethod,
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
    <div>
      <MetaData title={"order Invoice"} />
      <div class="order-invoice my-5">
        <div class="row d-flex justify-content-center mb-5">
          <button class="btn btn-success col-md-5" onClick={handleDownload}>
            <i class="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" class="p-3 border border-secondary">
          <header class="clearfix">
            <div id="logo">
              <img
                src="../../../public/images/invoice-logo.png"
                alt="Company Logo"
              />
            </div>
            <h1>INVOICE {order?._id}</h1>
            <div id="company" class="clearfix">
              <div>ShopIT</div>
              <div>
                455 Foggy Heights,
                <br />
                AZ 85004, US
              </div>
              <div>(602) 519-0450</div>
              <div>
                <a href="mailto:info@shopit.com">info@shopit.com</a>
              </div>
            </div>
            <div id="project">
              <div>
                <span>Name</span> {user?.name}
              </div>
              <div>
                <span>EMAIL</span> {user?.email}
              </div>
              <div>
                <span>PHONE</span> {shippingInfo?.phone}
              </div>
              <div>
                <span>ADDRESS</span> {shippingInfo?.address},
                {shippingInfo?.city},{shippingInfo?.country}.
                {shippingInfo?.zipCode}
              </div>
              <div>
                <span>DATE</span>
                {new Date(order?.createdAt).toLocaleString("en-Us")}
              </div>
              <div>
                <span>Status</span> {paymentInfo?.status}
              </div>
            </div>
          </header>
          <main>
            <table class="mt-5">
              <thead>
                <tr>
                  <th class="service">ID</th>
                  <th class="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => {
                  return (
                    <tr>
                      <td class="service">{item?.product}</td>
                      <td class="desc">{item?.name}</td>
                      <td class="unit">{item?.price}</td>
                      <td class="qty">{item?.quantity}</td>
                      <td class="total">{item?.price * item?.quantity}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colspan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td class="total">${order?.itemsPrice}</td>
                </tr>

                <tr>
                  <td colspan="4">
                    <b>TAX 15%</b>
                  </td>
                  <td class="total">${order?.taxAmount}</td>
                </tr>

                <tr>
                  <td colspan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td class="total">${order?.shippingAmount}</td>
                </tr>

                <tr>
                  <td colspan="4" class="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td class="grand total">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div class="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
