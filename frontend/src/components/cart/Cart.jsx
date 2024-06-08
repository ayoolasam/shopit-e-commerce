import React from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'

const Cart = () => {

  const {cartItem} = useSelector((state) => state.cart)
  return (
    <>
    <MetaData title={"Your Cart"}/>
    {cartItem?.length === 0 ? (
      <h2 class="mt-5">Your Cart is Empty</h2>

    ):(
      <>
    <h2 class="mt-5">Your Cart :<b>{cartItem?.length} items</b></h2>
<div class="row d-flex justify-content-between">
  <div class="col-12 col-lg-8">
{cartItem.map((item)=>{
  return(
    <>
    <hr />
      <div class="cart-item" data-key="product1">
        <div class="row">
          <div class="col-4 col-lg-3">
            <img
              src={item?.image}
              alt="Laptop"
              height="90"
              width="115"
            />
          </div>
          <div class="col-5 col-lg-3">
            <a href={`/${item?.product}`}> {item?.name} </a>
          </div>
          <div class="col-4 col-lg-2 mt-4 mt-lg-0">
            <p id="card_item_price">{item?.price}</p>
          </div>
          <div class="col-4 col-lg-3 mt-4 mt-lg-0">
            <div class="stockCounter d-inline">
              <span class="btn btn-danger minus"> - </span>
              <input
                type="number"
                class="form-control count d-inline"
                value={item?.quantity}
                readonly
              />
              <span class="btn btn-primary plus"> + </span>
            </div>
          </div>
          <div class="col-4 col-lg-1 mt-4 mt-lg-0">
            <i id="delete_cart_item" class="fa fa-trash btn btn-danger"></i>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
 
})}
    

   
  </div>

  <div class="col-12 col-lg-3 my-4">
    <div id="order_summary">
      <h4>Order Summary</h4>
      <hr />
      <p>Subtotal: <span class="order-summary-values">8 (Units)</span></p>
      <p>Est. total: <span class="order-summary-values">$1499.97</span></p>
      <hr />
      <button id="checkout_btn" class="btn btn-primary w-100">
        Check out
      </button>
    </div>
  </div>
</div>
      </>
  )}
    
    </>
  )
}

export default Cart