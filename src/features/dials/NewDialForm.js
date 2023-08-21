import React, { useState } from "react";
import { Form, Grid } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addDial } from "./dialsSlice";
import { addDialRequest } from "./dialsApi";
import { nanoid } from "@reduxjs/toolkit";

const NewDialForm = ({ coffee }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    coffee,
    temp: "",
    weight: "",
    grind: "",
    time: "",
    yield: "",
    favorite: "",
    createdAt: Date.now(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      dialId: nanoid(),
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDial = await addDialRequest(formData);
    dispatch(addDial({ id: newDial, ...formData }));
    setFormData({
      coffee,
      temp: "",
      weight: "",
      grind: "",
      time: "",
      yield: "",
    });
  };

  return (
    <>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form widths='equal'>
            <Form.Group inline>
              <Form.Input
                label='Temperature'
                name='temp'
                placeholder='Temperature'
                value={formData.temp}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Weight'
                name='weight'
                placeholder='Weight'
                value={formData.weight}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Grind'
                name='grind'
                placeholder='Grind Setting'
                value={formData.grind}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Time'
                name='time'
                placeholder='Time'
                value={formData.time}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Input
                label='Yield'
                name='yield'
                placeholder='Yield'
                value={formData.yield}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default NewDialForm;
