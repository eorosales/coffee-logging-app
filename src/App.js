import React from "react";
import "./App.css";
import NewCoffeeForm from "./features/coffees/NewCoffeeForm";
import CoffeesList from "./features/coffees/CoffeesList";

function App() {
  return (
    <div className='App'>
      <CoffeesList />
      <NewCoffeeForm />
    </div>
  );
}

export default App;
