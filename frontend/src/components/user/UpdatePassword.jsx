import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updatePassword, { error, isLoading, isSuccess }] =
    useUpdatePasswordMutation();

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
    if (isSuccess) {
      Toastify({
        text: "password updated",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      newPassword,
    };

    console.log(userData);
    updatePassword(userData);
  };
  return (
    <div class="row wrapper">
      <div class="col-10 col-lg-8">
        <form
          class="shadow rounded bg-body"
          action="#"
          method="post"
          onSubmit={submitHandler}
        >
          <h2 class="mb-4">Update Password</h2>
          <div class="mb-3">
            <label for="old_password_field" class="form-label">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              class="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="new_password_field" class="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              class="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            class="btn update-btn w-100"
            disabled={isLoading}
          >
            {isLoading ? "updating password" : "update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
