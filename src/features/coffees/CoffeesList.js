import { useState } from "react";
import { useSelector } from "react-redux";
import { coffeesSelector, coffeesStatusSelector } from "./coffeesSlice";
import { Box, Button, Dialog, Grid } from "@mui/material";
import CoffeeCard from "./CoffeeCard";
import AddIcon from "@mui/icons-material/Add";
import NewCoffeeForm from "./NewCoffeeForm";

const CoffeesList = () => {
  const coffees = useSelector(coffeesSelector);
  const coffeesStatus = useSelector(coffeesStatusSelector);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h2>Coffees List</h2>{" "}
        <Button sx={{ marginLeft: "auto" }} onClick={handleClickOpen}>
          <AddIcon />
        </Button>
      </Box>

      <Grid container spacing={2}>
        {coffeesStatus === "success" &&
          coffees.map((coffee) => (
            <Grid item xs={12} sm={4} key={coffee.id}>
              <CoffeeCard coffee={coffee} />
            </Grid>
          ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <NewCoffeeForm close={handleClose} />
      </Dialog>
    </Box>
  );
};

export default CoffeesList;
