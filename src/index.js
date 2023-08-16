import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "semantic-ui-css/semantic.min.css";
import { fetchCoffees } from "./features/coffees/coffeesSlice";

const container = document.getElementById("root");
const root = createRoot(container);

store.dispatch(fetchCoffees());

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
