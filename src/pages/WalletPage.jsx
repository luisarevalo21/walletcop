import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import Card from "../components/Card/Card";
import NewCardForm from "../components/Card/NewCardForm";
const Wallet = () => {
  const [toggleAddCard, setToggleAddCard] = useState(false);
  //fetch users cards

  const [cards, setCards] = useState([
    { creditCardName: "Chase Sapphire Preferred", bank: "JPMorgan Chase", id: 1 },
    { creditCardName: "American Express Platinum", bank: "American Express", id: 2 },
  ]);

  useEffect(() => {}, []);
  const handleClick = id => {
    // navigate(`/card/${id}`);
  };
  const handleAddCard = () => {
    setToggleAddCard(prev => !prev);
  };

  const handleClose = () => {
    setToggleAddCard(false);
  };
  const handleDelete = id => {
    setCards(cards => cards.filter(card => card.id !== id));
  };
  const handleNewCard = form => {
    console.log(form);
    setCards([...cards, form]);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Stack mt={4}>
        <Button variant="contained" color="primary" onClick={() => handleAddCard()}>
          Add Card
        </Button>
      </Stack>
      <Card handleClick={handleClick} handleDelete={handleDelete} cards={cards} />

      {toggleAddCard && <NewCardForm open={toggleAddCard} handleClose={handleClose} handleNewCard={handleNewCard} />}
    </Box>
  );
};

export default Wallet;
