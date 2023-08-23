import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import UpdateCoffeeForm from "./UpdateCoffeeForm";
import { toggleFavorite } from "./coffeesSlice";
import { useDispatch } from "react-redux";
import { toggleFavoriteCoffeeRequest } from "./coffeesApi";

const CoffeeCard = ({ coffee }) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(coffee.favorite);
  const dispatch = useDispatch();

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleToggleFavorite = async (coffeeId) => {
    setFavorite(!favorite);
    const favoriteCoffee = await toggleFavoriteCoffeeRequest(
      coffeeId,
      favorite
    );
    dispatch(toggleFavorite(favoriteCoffee));
  };

  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardActionArea component={RouterLink} to={`coffees/${coffee.id}`}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Name: {coffee.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Roaster: {coffee.roaster}
            <br />
            Origin: {coffee.origin}
            <br />
            Process: {coffee.process}
            <br />
            Flavor: {`${coffee.flavorNotes}`}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          aria-label='add to favorites'
          onClick={() => handleToggleFavorite(coffee.id)}>
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <UpdateCoffeeForm
            coffee={coffee}
            handleExpandClick={handleExpandClick}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CoffeeCard;
