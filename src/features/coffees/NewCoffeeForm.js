import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoffee } from "./coffeesSlice";
import { addCoffeeRequest } from "./coffeesApi";
import { capitalize } from "../../utils/formatting";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const NewCoffeeForm = ({ close }) => {
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
    close();
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
    <DialogContent
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        columnGap: 1,
      }}>
      <DialogTitle sx={{ width: "90%", textAlign: "center" }}>
        Add New Coffee
      </DialogTitle>
      <DialogContentText>
        Please fill in all fields to add a new coffee to your collection.
      </DialogContentText>
      <TextField
        sx={{ width: "49%" }}
        variant='standard'
        autoFocus
        margin='dense'
        label='Roaster'
        name='roaster'
        value={formData.roaster}
        onChange={(e) => handleChange(e)}
        size='small'
        required
      />
      <TextField
        sx={{ width: "49%" }}
        variant='standard'
        margin='dense'
        label='Name'
        name='name'
        value={formData.name}
        onChange={(e) => handleChange(e)}
        size='small'
        required
      />

      <TextField
        sx={{ width: "49%" }}
        variant='standard'
        margin='dense'
        label='Origin'
        name='origin'
        value={formData.origin}
        onChange={(e) => handleChange(e)}
        size='small'
        required
      />
      <TextField
        sx={{ width: "49%" }}
        variant='standard'
        margin='dense'
        label='Process'
        name='process'
        value={formData.process}
        onChange={(e) => handleChange(e)}
        size='small'
        required
      />

      <TextField
        margin='dense'
        variant='standard'
        label='Flavor Notes'
        name='flavorNotes'
        placeholder='Flavor 1, Flavor 2, Flavor 3...'
        value={formData.flavorNotes}
        onChange={(e) => handleChange(e)}
        size='small'
        fullWidth
        required
      />
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={(e) => handleSubmit(e)}>Add</Button>
      </DialogActions>
    </DialogContent>
  );
};

export default NewCoffeeForm;
