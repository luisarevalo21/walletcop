import React from "react";
import { Box, Typography } from "@mui/material";
import CardItem from "../Card/CardItem";
import visaImage from "../../assets/visa-cc.png";
const FavoritesItem = ({ card, categoryName, handleEdit, favoritesArray, handleNewFavorite }) => {
  if (favoritesArray) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={1.5}
        onClick={() => handleNewFavorite(card)}
      >
        <Box mr={2} boxShadow={""} borderRadius={"5px"} width={"200px"}>
          <img src={visaImage} alt="card" width={"100%"} />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          alignItems={"flex-start"}
        >
          <Typography variant={"p"}>{card.bank}</Typography>
          <Typography variant={"p"}>{card.creditCardName}</Typography>
          <Typography variant={"p"}>2% cashback on food</Typography>
          <Typography variant={"p"}>2% cashback on food</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} mt={2}>
      <Typography variant="h5">{categoryName}</Typography>
      <CardItem edit={true} card={{ ...card }} handleEdit={handleEdit} categoryName={categoryName} />
    </Box>
  );
};

export default FavoritesItem;
