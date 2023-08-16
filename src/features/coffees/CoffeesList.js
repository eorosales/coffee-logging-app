import { useDispatch, useSelector } from "react-redux";
import {
  coffeesSelector,
  coffeesStatusSelector,
  deleteCoffee,
} from "./coffeesSlice";
import { deleteCoffeeById } from "./coffeesAPI";
import UpdateCoffeeForm from "./UpdateCoffeeForm";

const CoffeesList = () => {
  const dispatch = useDispatch();
  const coffees = useSelector(coffeesSelector);
  const coffeesStatus = useSelector(coffeesStatusSelector);

  const handleDelete = (id) => {
    deleteCoffeeById(id);
    dispatch(deleteCoffee(id));
  };

  return (
    <>
      <h2>Coffees List</h2>
      {coffeesStatus === "success" &&
        coffees.map((coffee) => (
          <section key={coffee.id}>
            <ul>
              <li>Name: {coffee.name}</li>
              <li>Roaster: {coffee.roaster}</li>
              <li>Origin: {coffee.origin}</li>
              <li>Process: {coffee.process}</li>
              <li>Flavors: {`${coffee.flavorNotes}`}</li>
            </ul>
            <button onClick={() => handleDelete(coffee.id)}>X</button>
            <UpdateCoffeeForm coffee={coffee} />
          </section>
        ))}
    </>
  );
};

export default CoffeesList;
