import React, { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [forgotPassword, { isSuccess, isLoading, error }] =
    useForgotPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({email});
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

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
    if (isSuccess) {
      Toastify({
        text: `email sent to ${email} Please check your inbox`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
      // navigate("/me/profile");
    }
  }, [error, isSuccess, isAuthenticated]);





  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mt-3">
            <label for="email_field" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
