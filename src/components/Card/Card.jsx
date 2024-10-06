import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CardItem from "./CardItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Card = ({ category, handleClick, handleDelete }) => {
  const [cards, setCards] = useState([]);

  const [toggleCards, setToggleCards] = useState(true);
  const handleToggleCards = () => {
    console.log("button clciked");
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
          <CardItem id="1" handleClick={handleClick} handleDelete={handleDelete} />
          <CardItem id="2" handleClick={handleClick} handleDelete={handleDelete} />
          <CardItem id="3" handleClick={handleClick} handleDelete={handleDelete} />
        </>
      )}
    </Box>
  );
};

export default Card;
