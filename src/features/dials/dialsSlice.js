import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dials: [],
  dialsStatus: "idle" | "loading" | "success",
};

export const dialsSlice = createSlice({
  name: "Dials",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// Actions

// Selector
export const usersSelector = (state) => state.dials;

// Export reducer
export default dialsSlice.reducer;
