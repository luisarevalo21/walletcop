import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CardItem from "../Card/CardItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const FavoritesItem = ({
  categoryName,
  favorite,
  handleEdit,
  favoritesArray,
  handleNewFavorite,
  favoriteTitle,
  handleDeleteCategory,
  toggleAddNewCard,
}) => {
  return (
    <Box mt={2} border={"2px solid black"} p={2} position={"relative"}>
      <Box>
        <Button
          sx={{
            top: "0",
            left: "0",
            position: "absolute",
            padding: "0",
            margin: "0",
            minWidth: 0,
          }}
          onClick={() => handleDeleteCategory(favorite.categoryId)}
        >
          <DeleteForeverOutlinedIcon style={{ fill: "#EB5757" }} />
        </Button>
        <Typography variant="h5" textAlign={"left"} mt={2}>
          {favorite.categoryName}
        </Typography>
      </Box>

      {/* <Box display="flex" alignItems={"center"} mt={2}> */}
      {favorite.creditCardId ? (
        <CardItem favorites={true} card={favorite.creditCardId} />
      ) : (
        <Button variant="contained" onClick={() => toggleAddNewCard(favorite.categoryName, favorite.categoryId)}>
          Add Card
        </Button>
        // <Box>
        //   <Typography variant="h5" textAlign={"left"} mt={2}>
        //     No card added
        //   </Typography>
        // </Box>
        // <CardItem
        // // handleEdit={handleEdit}
        // // categoryName={favorite.categoryName}
        // // card={favorite.creditCardId}
        // />
      )}
      {/* </Box> */}

      {/* <Box>{favorite.category}</Box> */}
      {/* <CardItem edit={true} handleEdit={handleEdit} categoryName={favorite.categoryName} /> */}
      {/* <CardItem edit={true} card={card} handleEdit={handleEdit} categoryName={categoryName} /> */}
    </Box>
  );
};

export default FavoritesItem;
