import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
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
  },
});
export default cartSlice.reducer;
export const { setCartItem } = cartSlice.actions;
