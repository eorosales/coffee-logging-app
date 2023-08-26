import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCoffeesRequest, updateCoffeeRequest } from "./coffeesApi";

const initialState = {
  coffees: [],
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

// |=================|
// |  Coffees Slice  |
// |=================|

export const coffeesSlice = createSlice({
  name: "coffees",
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
    toggleFavorite: (state, { payload }) => {
      const coffeeToFav = state.coffees.findIndex(
        (coffee) => coffee.id === payload
      );
      state.coffees[coffeeToFav] = {
        ...state.coffees[coffeeToFav],
        favorite: !state.coffees[coffeeToFav].favorite,
      };
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

export const { addCoffee, deleteCoffee, updateCoffee, toggleFavorite } =
  coffeesSlice.actions;

// |============|
// |  Selector  |
// |============|

export const coffeesSelector = (state) => state.coffees.coffees;
export const coffeesStatusSelector = (state) => state.coffees.coffeesStatus;

// |==================|
// |  Export Reducer  |
// |==================|

export default coffeesSlice.reducer;
