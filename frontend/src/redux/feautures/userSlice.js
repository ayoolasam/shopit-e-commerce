import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user:null,
  isAuthenticated:false,
  Loading:true
}

export const userSlice = createSlice({
  initialState,
  name:"userSlice",
  reducers:{
    setUser(state,action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state,action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state,action) {
      state.Loading = action.payload;
    },
  },
});
export default userSlice.reducer;
export const {setIsAuthenticated,setUser,setLoading} = userSlice.actions