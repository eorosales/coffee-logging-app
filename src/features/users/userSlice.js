import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  usersStatus: "idle" | "loading" | "success",
};

export const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// Actions

// Selector
export const usersSelector = (state) => state.users;

// Export reducer
export default usersSlice.reducer;
