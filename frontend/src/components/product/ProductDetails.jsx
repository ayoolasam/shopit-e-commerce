import React, { useEffect } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductDetailsQuery(id);

  const product = data?.product;

  const [activeimg, setActiveimg] = useState("");

  useEffect(() => {
    setActiveimg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  if (error) {
    return <p>error loading product details {error?.message}</p>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeimg}
            alt=""
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img.url === activeimg ? "border-warning" : ""
                  }`}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => {
                    setActiveimg(img.url);
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">{product?._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product?.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="24px"
            starSpacing="1px"
          />

          <span id="no-of-reviews" className="pt-1 ps-2">
            {" "}
            ({product?.numOfReviews} Reviews){" "}
          </span>
        </div>
        <hr />

        <p id="product_price">{product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? " greenColor" : "redColor"}
          >
            {product?.stock > 0 ? " In Stock" : "out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
