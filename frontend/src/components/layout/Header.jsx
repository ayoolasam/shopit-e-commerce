import React from "react";
import shopitLogo from "../../images/shopit_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import Search from "./Search";

const Header = () => {
  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);

  const {cartItem} = useSelector((state)=>state.cart)

  const logoutHandler = () => {
    logout();
    //refresh this page navigate(0)
    navigate(0);
  };
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src={shopitLogo} alt="ShopIT Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search/>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            {" "}
            Cart{" "}
          </span>
          <span className="ms-1" id="cart_count">
            {cartItem?.length}
          </span>
        </a>
        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "../../images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {
                user?.role === "admin" ? 
                <a className="dropdown-item" href="/admin/dashboard">
                  {" "}
                  Dashboard{" "}
                </a> : 
             " "
                }

            

              <a className="dropdown-item" href="/me/orders">
                {" "}
                Orders{" "}
              </a>

              <Link className="dropdown-item" to="/me/profile">
                {" "}
                Profile{" "}
              </Link>

              <a
                className="dropdown-item text-danger"
                onClick={logoutHandler}
                href="/"
              >
                {" "}
                Logout{" "}
              </a>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" href="/login" className="btn ms-4" id="login_btn">
              {" "}
              Login{" "}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
