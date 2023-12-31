import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import UpdateCoffeeForm from "./UpdateCoffeeForm";
import { toggleFavorite } from "./coffeesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteCoffeeRequest } from "./coffeesApi";
import { dialsSelector } from "../dials/dialsSlice";

const CoffeeCard = ({ coffee }) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(coffee.favorite);
  const dials = useSelector(dialsSelector);
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

  const baseDial = () => {
    return dials
      .filter((dial) => dial.coffee === coffee.id && dial.favorite === true)
      .map((dial) => (
        <Box
          key={dial.id}
          sx={{
            width: 1,
            display: "flex",
            margin: "auto",
            marginBlockStart: 2,
          }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: "0" }}>Temp</TableCell>
                <TableCell sx={{ padding: "0" }}>Weight</TableCell>
                <TableCell sx={{ padding: "0" }}>Time</TableCell>
                <TableCell sx={{ padding: "0" }}>Yield</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ padding: "0" }}>{dial.temp}</TableCell>
                <TableCell sx={{ padding: "0" }}>{dial.weight}</TableCell>
                <TableCell sx={{ padding: "0" }}>{dial.time}</TableCell>
                <TableCell sx={{ padding: "0" }}>{dial.yield}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      ));
  };

  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardActionArea component={RouterLink} to={`coffees/${coffee.id}`}>
        <CardContent>
          <Typography variant='secondary' component='div'>
            {coffee.roaster}
          </Typography>
          <Typography variant='h3'>{coffee.name}</Typography>
          <Typography variant='secondary' component='div'>
            {coffee.origin}
          </Typography>
          {baseDial()}
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
