import React from "react";
import "./App.css";
import CoffeesList from "./features/coffees/CoffeesList";
import { Container } from "@mui/material";

function App() {
  return (
    <Container>
      <CoffeesList />
    </Container>
  );
}

export default App;
