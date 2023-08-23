import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCoffee } from "./coffeesSlice";
import { updateCoffeeRequest } from "./coffeesApi";
import { Box, Button, Container, TextField } from "@mui/material";
import { deleteCoffeeById } from "./coffeesApi";
import { deleteCoffee } from "./coffeesSlice";
import { deleteAllDialsByCoffeeIdRequest } from "../dials/dialsApi";
import { deleteAllDialsByCoffeeId } from "../dials/dialsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UpdateCoffeeForm = ({ coffee, handleExpandClick }) => {
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
    handleExpandClick();
  };

  const handleDeleteCoffee = (id) => {
    dispatch(deleteCoffee(id));
    dispatch(deleteAllDialsByCoffeeId(id));
    deleteCoffeeById(id);
    deleteAllDialsByCoffeeIdRequest(id);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TextField
          id='outlined-helperText'
          name='name'
          label='Name'
          value={updateInfo.name}
          onChange={(e) => handleChange(e)}
          size='small'
          sx={{ width: 1 }}
          required
        />
        <TextField
          id='outlined-helperText'
          name='roaster'
          label='Roaster'
          value={updateInfo.roaster}
          onChange={(e) => handleChange(e)}
          size='small'
          sx={{ mt: 2, width: 1 }}
          required
        />
        <TextField
          id='outlined-helperText'
          name='origin'
          label='Origin'
          value={updateInfo.origin}
          onChange={(e) => handleChange(e)}
          size='small'
          sx={{ mt: 2, width: 1 }}
          required
        />
        <TextField
          id='outlined-helperText'
          name='process'
          label='Process'
          value={updateInfo.process}
          onChange={(e) => handleChange(e)}
          size='small'
          sx={{ mt: 2, width: 1 }}
          required
        />
        <TextField
          id='outlined-helperText'
          name='flavorNotes'
          label='Flavor Notes'
          value={updateInfo.flavorNotes}
          onChange={(e) => handleChange(e)}
          size='small'
          sx={{ mt: 2, width: 1 }}
          required
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteCoffee(coffee.id)}
          sx={{ color: "salmon" }}>
          Delete
        </Button>
        <Button startIcon={<EditIcon />} onClick={(e) => handleSubmit(e)}>
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateCoffeeForm;
