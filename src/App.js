import React from "react";
import "./App.css";
import NewCoffeeForm from "./features/coffees/NewCoffeeForm";
import CoffeesList from "./features/coffees/CoffeesList";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <div className='App'>
      <Container style={{ margin: 20 }}>
        <CoffeesList />
        <NewCoffeeForm />
      </Container>
    </div>
  );
}

export default App;
