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
  handleDeleteCard,
  handleEditCard,
  handleToggleEditModal,
  allowEdit,
}) => {
  return (
    <Box mt={2} border={"2px solid #D9D9D9"} p={1} position={"relative"}>
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

      {favorite.creditCardId ? (
        <CardItem
          favorites={true}
          card={favorite.creditCardId}
          categoryId={favorite.categoryId}
          handleDeleteCard={handleDeleteCard}
          handleEditCard={handleEditCard}
          categoryName={favorite.categoryName}
          handleToggleEditModal={handleToggleEditModal}
          allowEdit={allowEdit}
        />
      ) : (
        <Button
          variant="contained"
          sx={{
            marginTop: ".9em",
          }}
          onClick={() => toggleAddNewCard(favorite.categoryName, favorite.categoryId)}
        >
          Add Card
        </Button>
      )}
    </Box>
  );
};

export default FavoritesItem;
