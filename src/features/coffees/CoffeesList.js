import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  coffeesSelector,
  coffeesStatusSelector,
  deleteCoffee,
} from "./coffeesSlice";
import { deleteCoffeeById } from "./coffeesAPI";
import UpdateCoffeeForm from "./UpdateCoffeeForm";
import { Link } from "react-router-dom";

const CoffeesList = () => {
  const dispatch = useDispatch();
  const coffees = useSelector(coffeesSelector);
  const coffeesStatus = useSelector(coffeesStatusSelector);

  const handleDelete = (id) => {
    dispatch(deleteCoffee(id));
    deleteCoffeeById(id);
  };

  return (
    <>
      <h2>Coffees List</h2>
      {coffeesStatus === "success" &&
        coffees.map((coffee) => (
          <section key={coffee.id}>
            <ul>
              <li>
                {coffee.roaster} - {coffee.name}
              </li>
              <li>
                {coffee.origin} - {coffee.process} Process
              </li>
              <li>Notes of {`${coffee.flavorNotes}`}</li>
            </ul>
            <button onClick={() => handleDelete(coffee.id)}>X</button>
            <Link
              component={RouterLink}
              to={`coffees/${coffee.id}`}
              style={{ textDecoration: "none" }}>
              <strong>Details</strong>
            </Link>
            <button>Dials</button>
            <UpdateCoffeeForm coffee={coffee} />
          </section>
        ))}
    </>
  );
};

export default CoffeesList;
