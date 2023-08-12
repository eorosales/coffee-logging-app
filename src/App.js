import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import NewCoffeeForm from "./components/NewCoffeeForm/NewCoffeeForm";

function App() {
  return (
    <div className='App'>
      <Dashboard />
      <div>
        <h2>Add New Coffee</h2>
        <NewCoffeeForm />
      </div>
    </div>
  );
}

export default App;
