import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nonce: null,
  settings: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNonce(state, action) {
      state.nonce = action.payload.nonce;
      state.wc_nonce = action.payload.wc_nonce;
    },
  },
});

export const { setNonce } = authSlice.actions;
export default authSlice.reducer;
