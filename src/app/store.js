import { configureStore } from "@reduxjs/toolkit";
import coffeesReducer from "../features/coffees/coffeesSlice";
import dialsReducer from "../features/dials/dialsSlice";
import usersReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    coffees: coffeesReducer,
    dials: dialsReducer,
    users: usersReducer,
  },
});
