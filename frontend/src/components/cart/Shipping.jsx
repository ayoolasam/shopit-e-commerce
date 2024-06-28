import React from "react";
import { useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/feautures/cartSlice";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import MetaData from "../layout/MetaData"

import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countriesList = Object.values(countries);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const { shippingInfo, cartItem } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setZipCode(shippingInfo.zipCode);
      setPhone(shippingInfo.phone);
      setCountry(shippingInfo.country);
    }
  }, [shippingInfo]);

  
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phone, zipCode, country }));
    navigate("/confirmOrder");
  };

  return (
    <>
    {/* <MetaData title={"shipping Info"}/> */}
    <CheckOutSteps shippingInfo/>
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipCode}
                required
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countriesList?.map((country) => {
                  return (
                    <option key={country?.name} value={country?.name}>
                      {country?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
