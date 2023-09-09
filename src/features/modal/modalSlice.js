import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.open = !state.open;
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
