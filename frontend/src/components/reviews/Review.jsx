import React from "react";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useCreatereviewMutation ,useCanUserReviewQuery} from "../../redux/api/productsApi";
import { useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Review = ({productId}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const [createReview,{isLoading,error,isSuccess}]=useCreatereviewMutation()
 const{data} = useCanUserReviewQuery(productId)
 const canReview = data?.canReview

  const submitHandler = () => {
    const reviewData = {rating,comment,productId}
    createReview(reviewData)
  };
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
    if(isSuccess){
      Toastify({
        text: "review Submitted",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right,#ff5f6d,#ffc371",
      }).showToast();
    }
  }, [error,isSuccess]);
  return (
    <div>
    {
      canReview && 
     (
      <button
        id="review_btn"
        type="button"
        className="btn btn-primary mt-4"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>
     )}

      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#e69e0f"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(e) => setRating(e)}
                  />
                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
