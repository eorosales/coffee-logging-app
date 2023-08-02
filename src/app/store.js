import { configureStore } from "@reduxjs/toolkit";
import coffeesReducer from "../features/coffees/coffeesSlice";

export const store = configureStore({
  reducer: {
    coffees: coffeesReducer,
  },
});
