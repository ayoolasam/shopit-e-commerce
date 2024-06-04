import React, { useState,useEffect } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useSelector } from "react-redux";


const PasswordReset = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')

  const { isAuthenticated } = useSelector((state) => state.auth);
const [resetPassword,{isLoading,isSuccess,error}]= useResetPasswordMutation(params)




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
      text: "password reset succesfully",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
    }).showToast();
    navigate("/login");
  }
}, [error, isSuccess,isAuthenticated]);

const submitHandler = (e) => {
  e.preventDefault();
  if(password!==confirmpassword){
    Toastify({
      text: "password and confirm password is not the same",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
    }).showToast();
  }
  const resetData = {
    
    password,
    confirmpassword
  };
  resetPassword({token:params?.token,body:resetData});
};


  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlfor="password_field" className="htmlform-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="htmlform-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlfor="confirm_password_field" className="htmlform-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="htmlform-control"
              name="confirm_password"
              value={confirmpassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2">
            {isLoading ? "Setting Password" : "SetPassword"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
