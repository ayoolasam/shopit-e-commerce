import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import UserLayout from "../layout/UserLayout";

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
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
        text: "user updated",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
      navigate("/me/profile");
    }
    
  },[user, error, isSuccess,]);

  const submitHandler = (e) => {
  
    e.preventDefault()
    const userData = {
      name,
      email,
    };
  console.log(userData)
    updateProfile(userData)
  }




  return (
    <UserLayout>
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          action="#"
          method="post"
          enctype="multipart/form-data"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label for="name_field" className="form-label">
              {" "}
              Name{" "}
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="email_field" className="form-label">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
            {isLoading ? "updating...." :"Update"}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default UpdateUser;
