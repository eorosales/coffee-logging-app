import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Coffee from "./features/coffees/Coffee";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getCoffeeRequest } from "./features/coffees/coffeesApi";
import { fetchCoffees } from "./features/coffees/coffeesSlice";
import { fetchDialsThunk } from "./features/dials/dialsSlice";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./utils/theme";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "coffees/:coffeeId",
    element: <Coffee />,
    loader: async ({ params }) => getCoffeeRequest(params.coffeeId),
  },
]);

store.dispatch(fetchCoffees());
store.dispatch(fetchDialsThunk());

root.render(
  // <React.StrictMode>

  <Provider store={store}>
    <ThemeProvider theme={themeOptions}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
