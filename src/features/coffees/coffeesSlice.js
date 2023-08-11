import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCoffees,
  addCoffee,
  deleteCoffee,
  updateCoffee,
} from "./coffeesAPI";

const initialState = {
  coffees: [],
  coffeesStatus: "idle",
};

// API handlers

export const fetchCoffees = createAsyncThunk(
  "coffees/fetchCoffees",
  async () => {
    try {
      const response = await getCoffees();
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const addNewCoffee = createAsyncThunk(
  "coffees/addNewCoffee",
  async (newCoffeeFormData) => {
    try {
      const response = await addCoffee(newCoffeeFormData);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const updateCoffeeInfo = createAsyncThunk(
  "coffees/updateCoffeeInfo",
  async (updateCoffeeInfo) => {
    try {
      const response = await updateCoffee(updateCoffeeInfo);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const deleteCoffeeById = createAsyncThunk(
  "coffees/deleteCoffeeById",
  async (id) => {
    try {
      const response = await deleteCoffee(id);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

// Coffees Slice

export const coffeesSlice = createSlice({
  name: "Coffees",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoffees.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(fetchCoffees.fulfilled, (state, { payload }) => {
        state.coffeesStatus = "success";
        state.coffees = payload;
      })
      .addCase(addNewCoffee.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(addNewCoffee.fulfilled, (state, { payload }) => {
        state.coffeesStatus = "success";
      })
      .addCase(deleteCoffeeById.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(deleteCoffeeById.fulfilled, (state) => {
        state.coffeesStatus = "success";
      })
      .addCase(updateCoffeeInfo.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(updateCoffeeInfo.fulfilled, (state) => {
        state.coffeesStatus = "success";
      });
  },
});

// Actions

// Selector
export const coffeesSelector = (state) => state.coffees;

// Export reducer
export default coffeesSlice.reducer;
