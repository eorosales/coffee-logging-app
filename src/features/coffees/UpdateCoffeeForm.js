import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCoffee } from "./coffeesSlice";
import { updateCoffeeRequest } from "./coffeesApi";

const UpdateCoffeeForm = ({ coffee }) => {
  const dispatch = useDispatch();
  const [updateInfo, setUpdateInfo] = useState({
    id: coffee.id,
    roaster: coffee.roaster,
    name: coffee.name,
    origin: coffee.origin,
    process: coffee.process,
    flavorNotes: coffee.flavorNotes,
    favorite: coffee.favorite,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setUpdateInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCoffee(updateInfo));
    updateCoffeeRequest(updateInfo);
  };

  return (
    <>
      <form>
        <input
          label='Roaster'
          name='roaster'
          placeholder='Coffee Roaster'
          value={updateInfo.roaster}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Name'
          name='name'
          placeholder='Coffee Name'
          value={updateInfo.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Origin'
          name='origin'
          placeholder='Coffee Origin'
          value={updateInfo.origin}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Process'
          name='process'
          placeholder='Coffee Process'
          value={updateInfo.process}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Flavor Notes'
          name='flavorNotes'
          placeholder='Coffee Flavor Notes'
          value={updateInfo.flavorNotes}
          onChange={(e) => handleChange(e)}
          required
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
};

export default UpdateCoffeeForm;
