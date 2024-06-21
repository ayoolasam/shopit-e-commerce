import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const errorMessage = error?.data?.message;
  console.log(errorMessage);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

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
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  return (
    <div>
      <MetaData title={"Login"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
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

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="/forgotPassword" className="float-end mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>

            <div className="my-3">
              <Link to="/register" className="float-end">
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
