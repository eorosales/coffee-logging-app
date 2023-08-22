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
            <div>
              <h3>{coffee.name}</h3>
              <p>{coffee.roaster} </p>
              <p>
                {coffee.origin} - {coffee.process} Process Notes of{" "}
                {`${coffee.flavorNotes}`}
              </p>

              <UpdateCoffeeForm coffee={coffee} />
            </div>

            <div>
              <button onClick={() => handleDeleteCoffee(coffee.id)}>X</button>
              <button>
                <Link component={RouterLink} to={`coffees/${coffee.id}`}>
                  Details
                </Link>
              </button>
            </div>
          </section>
        ))}
    </>
  );
};

export default CoffeesList;
