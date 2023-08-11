import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import NewCoffeeForm from "./components/NewCoffeeForm/NewCoffeeForm";

function App() {
  return (
    <div className='App'>
      <Dashboard />
      <NewCoffeeForm />
    </div>
  );
}

export default App;
