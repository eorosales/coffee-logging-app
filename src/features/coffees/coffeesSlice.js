import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoffees } from "./coffeesAPI";

const initialState = {
  coffees: [],
  coffeesStatus: "idle",
};

export const getAllCoffees = createAsyncThunk(
  "coffees/fetchCoffees",
  async () => {
    try {
      const response = await fetchCoffees();
      return response;
    } catch (err) {
      return err.message;
    }
  }
);

export const coffeesSlice = createSlice({
  name: "coffees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoffees.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(getAllCoffees.fulfilled, (state, { payload }) => {
        state.coffeesStatus = "success";
        state.coffees = payload.coffees;
      });
  },
});

// Selector
export const coffeesSelector = (state) => state.coffees;

// Export Reducer
export default coffeesSlice.reducer;
