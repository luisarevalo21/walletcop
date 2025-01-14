import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CardItem from "./CardItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
const Card = ({
  category,
  handleClick,
  handleDelete,
  cards,
  categoryPage,
  handleAddCardToFavorites,
  selectedCategory,
  walletPage,
  favoriteCard,
  handleShowCategoryModal,
}) => {
  const [toggleCards, setToggleCards] = useState(true);
  const handleToggleCards = () => {
    setToggleCards(!toggleCards);
  };

  const navigate = useNavigate();
  let cardsEl = null;

  if (cards.length === 0 && categoryPage) {
    cardsEl = (
      <Box>
        <Typography variant="h4"> No cards found for that category! </Typography>
        <Typography variant="h4"> Select a new category </Typography>
        <Button onClick={() => navigate("/wallet")} variant="contained">
          Add New Cards
        </Button>
      </Box>
    );
  } else if (cards.length === 0) {
    cardsEl = (
      <Box>
        <Typography variant="h4"> No cards found try adding some!</Typography>
      </Box>
    );
  }
  if (cards.length > 0) {
    cardsEl = cards.map(card => (
      <CardItem
        key={card._id ? card._id : card.id}
        card={card}
        selectedCategory={selectedCategory}
        handleClick={handleClick}
        handleDelete={handleDelete}
        categoryPage={categoryPage}
        walletPage={walletPage}
        handleAddCardToFavorites={handleAddCardToFavorites}
        handleShowCategoryModal={handleShowCategoryModal}
        favoriteCard={favoriteCard}
      />
    ));
  }
  return (
    <Box display={"flex"} flexDirection={"column"} p={2} width={"100%"}>
      <Box display={"flex"} justifyItems={"center"} justifyContent={"space-between"}>
        <Typography variant={"h4"} justifySelf={"left"}>
          My Cards
        </Typography>
        {toggleCards ? (
          <Button onClick={() => handleToggleCards()}>
            <KeyboardArrowUpIcon />
          </Button>
        ) : (
          <Button onClick={() => handleToggleCards()}>
            <KeyboardArrowDownIcon />
          </Button>
        )}
      </Box>
      {toggleCards && cardsEl}
    </Box>
  );
};

export default Card;
