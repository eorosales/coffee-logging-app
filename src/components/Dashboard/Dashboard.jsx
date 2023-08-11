import React, { useEffect, useState } from "react";
import {
  coffeesSelector,
  deleteCoffeeById,
  fetchCoffees,
} from "../../features/coffees/coffeesSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateCoffeeForm from "../UpdateCoffeeForm/UpdateCoffeeForm";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [allCoffees, setAllCoffees] = useState([]);
  const { coffees, coffeesStatus } = useSelector(coffeesSelector);

  useEffect(() => {
    if (coffeesStatus === "idle" || coffeesStatus === "loading") {
      dispatch(fetchCoffees());
    }
    if (coffeesStatus === "success") {
      setAllCoffees(coffees.coffees);
    }
  }, [dispatch, coffees, coffeesStatus]);

  return (
    <>
      {coffeesStatus !== "success" ? (
        <h2>Loading, dayum, chill!</h2>
      ) : (
        <section>
          {allCoffees.map((coffee) => (
            <div key={coffee.id}>
              <ul>
                <li>{coffee.roaster}</li>
                <li>{coffee.name}</li>
                <li>{coffee.origin}</li>
                <li>{coffee.process}</li>
                <li>{coffee.flavorNotes}</li>
              </ul>
              <UpdateCoffeeForm coffee={coffee} />
              <button onClick={() => dispatch(deleteCoffeeById(coffee.id))}>
                X
              </button>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Dashboard;
