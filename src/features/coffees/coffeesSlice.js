import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  toggleFavoriteCoffee,
  getCoffeesRequest,
  updateCoffeeRequest,
} from "./coffeesAPI";

const initialState = {
  coffees: [],
  coffeesFavorites: [],
  coffeesStatus: "idle",
};

// |====================|
// |  Thunk Middleware  |
// |====================|

export const fetchCoffees = createAsyncThunk(
  "coffees/fetchCoffees",
  async () => {
    try {
      const response = await getCoffeesRequest();
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const updateCoffeeThunk = createAsyncThunk(
  "coffees/updateCoffeeThunk",
  async (updateCoffeeInfo) => {
    try {
      const response = await updateCoffeeRequest(updateCoffeeInfo);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "coffees/toggleFavorite",
  async (toggleFav) => {
    try {
      const response = await toggleFavoriteCoffee(toggleFav);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

// |=================|
// |  Coffees Slice  |
// |=================|

export const coffeesSlice = createSlice({
  name: "Coffees",
  initialState,
  reducers: {
    addCoffee: (state, { payload }) => {
      state.coffees.push(payload);
    },
    deleteCoffee: (state, { payload }) => {
      state.coffees = state.coffees.filter((coffee) => coffee.id !== payload);
    },
    updateCoffee: (state, { payload }) => {
      const coffeeToUpdate = state.coffees.findIndex(
        (coffee) => coffee.id === payload.id
      );
      state.coffees[coffeeToUpdate] = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoffees.pending, (state) => {
        state.coffeesStatus = "loading";
      })
      .addCase(fetchCoffees.fulfilled, (state, { payload }) => {
        state.coffeesStatus = "success";
        state.coffees = payload.coffees;
      });
  },
});

// |===========|
// |  Actions  |
// |===========|

export const { addCoffee, deleteCoffee, updateCoffee } = coffeesSlice.actions;

// |============|
// |  Selector  |
// |============|

export const coffeesSelector = (state) => state.coffees.coffees;
export const coffeesStatusSelector = (state) => state.coffees.coffeesStatus;

// |==================|
// |  Export Reducer  |
// |==================|

export default coffeesSlice.reducer;
