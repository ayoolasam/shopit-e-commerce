import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItem: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],


    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : []
};

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItem.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItem = state.cartItem.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },




    clearCart: (state, action) => {
    localStorage.removeItem("cartItems")
    state.cartItem = []
    },


    removeCartItem: (state, action) => {
      state.cartItem = state?.cartItem?.filter(
        (i) => i.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    saveShippingInfo :(state,action) => {
     state.shippingInfo = action.payload
     localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    }
  },
});

export default cartSlice.reducer;
export const { setCartItem, removeCartItem,saveShippingInfo,clearCart } = cartSlice.actions;
