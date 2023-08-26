import { useState } from "react";
import { useSelector } from "react-redux";
import { coffeesSelector, coffeesStatusSelector } from "./coffeesSlice";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
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
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        {/* Title and New Coffee Form Button "+" */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant='h3'>Coffees List</Typography>
          <Button sx={{ marginLeft: "auto" }} onClick={handleClickOpen}>
            <AddIcon />
          </Button>
        </Box>{" "}
        {/* All Coffees */}
        <Grid container spacing={2}>
          {coffeesStatus === "success" &&
            coffees.map((coffee) => (
              <Grid item xs={12} sm={4} key={coffee.id}>
                <CoffeeCard coffee={coffee} />
              </Grid>
            ))}
        </Grid>
        {/* Open Dialog for New Coffee Form */}
        <Dialog open={open} onClose={handleClose}>
          <NewCoffeeForm close={handleClose} />
        </Dialog>
      </Box>
    </Container>
  );
};

export default CoffeesList;
