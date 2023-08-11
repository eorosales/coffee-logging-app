import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCoffee } from "../../features/coffees/coffeesSlice";

const NewCoffeeForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roaster: "",
    name: "",
    origin: "",
    process: "",
    flavorNotes: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCoffee(formData));
    setFormData({
      roaster: "",
      name: "",
      origin: "",
      process: "",
      flavorNotes: "",
    });
  };

  return (
    <>
      <form>
        <input
          label='Roaster'
          name='roaster'
          placeholder='Coffee Roaster'
          value={formData.roaster}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Name'
          name='name'
          placeholder='Coffee Name'
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Origin'
          name='origin'
          placeholder='Coffee Origin'
          value={formData.origin}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Process'
          name='process'
          placeholder='Coffee Process'
          value={formData.process}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          label='Flavor Notes'
          name='flavorNotes'
          placeholder='Coffee Flavor Notes'
          value={formData.flavorNotes}
          onChange={(e) => handleChange(e)}
          required
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
};

export default NewCoffeeForm;
