import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  coffeesSelector,
  getAllCoffees,
} from "../features/coffees/coffeesSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { coffees, coffeesStatus } = useSelector(coffeesSelector);

  useEffect(() => {
    if (coffeesStatus === "idle" || coffeesStatus === "loading") {
      dispatch(getAllCoffees());
    }
  }, [dispatch, coffees, coffeesStatus]);

  return (
    <>
      <h3>Dashboard</h3>
      {coffeesStatus !== "success" ? (
        <h4>Loading</h4>
      ) : (
        <section>
          {coffees.map((coffee) => (
            <div key={coffee.id}>
              <p>{coffee.roaster}</p>
              <p>{coffee.name}</p>
              <p>{coffee.process}</p>
              <p>{coffee.origin}</p>
              <p>
                {coffee.profile.map((p) => (
                  <span>{p}</span>
                ))}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Dashboard;
