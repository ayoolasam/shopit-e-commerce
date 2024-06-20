import React from "react";

const ProceedPayment = () => {
  return (
    <>
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
          >
            <h2 class="mb-4">Select Payment Method</h2>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
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
              />
              <label class="form-check-label" for="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button id="shipping_btn" type="submit" class="btn py-2 w-100">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProceedPayment;
