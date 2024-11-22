import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CardItem from "./CardItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Card = ({ category, handleClick, handleDelete, cards }) => {
  const [toggleCards, setToggleCards] = useState(true);
  const handleToggleCards = () => {
    setToggleCards(!toggleCards);
  };

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
      {toggleCards && (
        <>
          {cards.length === 0 ? (
            <Box>
              <Typography variant="h4"> No cards found try adding some!</Typography>
            </Box>
          ) : (
            cards.map(card => (
              <CardItem key={card.id} card={card} handleClick={handleClick} handleDelete={handleDelete} />
            ))
          )}
        </>
      )}
    </Box>
  );
};

export default Card;
