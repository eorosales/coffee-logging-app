import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  coffeesSelector,
  coffeesStatusSelector,
  deleteCoffee,
} from "./coffeesSlice";
import { deleteCoffeeById } from "./coffeesApi";
import UpdateCoffeeForm from "./UpdateCoffeeForm";
import { Link } from "react-router-dom";
import { deleteAllDialsByCoffeeIdRequest } from "../dials/dialsApi";
import { deleteAllDialsByCoffeeId } from "../dials/dialsSlice";

const CoffeesList = () => {
  const dispatch = useDispatch();
  const coffees = useSelector(coffeesSelector);
  const coffeesStatus = useSelector(coffeesStatusSelector);

  const handleDeleteCoffee = (id) => {
    dispatch(deleteCoffee(id));
    dispatch(deleteAllDialsByCoffeeId(id));
    deleteCoffeeById(id);
    deleteAllDialsByCoffeeIdRequest(id);
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
            <button onClick={() => handleDeleteCoffee(coffee.id)}>X</button>
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
