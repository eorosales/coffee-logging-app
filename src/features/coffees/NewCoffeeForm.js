import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoffee } from "./coffeesSlice";
import { Form, Grid } from "semantic-ui-react";
import { addCoffeeRequest } from "./coffeesApi";
import { capitalize } from "../../utils/formatting";

const NewCoffeeForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    roaster: "",
    name: "",
    origin: "",
    process: "",
    flavorNotes: "",
    favorite: false,
    createdAt: Date.now(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: capitalize(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCoffee = await addCoffeeRequest(formData);
    dispatch(addCoffee({ id: newCoffee, ...formData }));
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
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form widths='equal'>
            <Form.Group inline>
              <Form.Input
                label='Roaster'
                name='roaster'
                placeholder='Coffee Roaster'
                value={formData.roaster}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Name'
                name='name'
                placeholder='Coffee Name'
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group inline>
              <Form.Input
                label='Origin'
                name='origin'
                placeholder='Coffee Origin'
                value={formData.origin}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Process'
                name='process'
                placeholder='Coffee Process'
                value={formData.process}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.TextArea
              inline
              label='Flavor Notes'
              name='flavorNotes'
              placeholder='Coffee Flavor Notes'
              value={formData.flavorNotes}
              onChange={(e) => handleChange(e)}
              required
            />

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default NewCoffeeForm;
