import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import NewCardForm from "../components/Card/NewCardForm";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useAuth, useUser } from "@clerk/clerk-react";
const Wallet = () => {
  const { user } = useUser();
  const api = useAxiosWithAuth();

  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  //fetch users cards

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUsersCards();

      console.log("updated cards", response.data);

      setCards(response.data);
    };

    getUser();
  }, []);

  // useEffect(() => {}, []);
  const handleClick = id => {
    navigate(`/card/${id}`);
  };
  const fetchUsersCards = async () => {
    const cards = await api.get(`/user/${user.id}/cards`);
    return cards;
  };

  const handleAddCard = () => {
    setToggleAddCard(prev => !prev);
  };

  const handleClose = () => {
    setToggleAddCard(false);
  };
  const handleDelete = async id => {
    const res = await api.delete(`/user/${user.id}/card/${id}`);
    if (res.status === 200) {
      setCards(cards => cards.filter(card => card.id !== id));
    }
  };
  const handleNewCard = async form => {
    try {
      const res = await api.post(`/user/${user.id}/newcard`, {
        creditCardId: form.creditCardId,
      });

      if (res.data.success) {
        const updatedCards = await fetchUsersCards();
        setCards(updatedCards.data);
        return;
      }
      if (!res.data.success) {
        alert("Card already exists try another card");
        return;
        // throw new Error(res.message);
      }
    } catch (err) {}
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Stack mt={4}>
        <Button variant="contained" color="primary" onClick={() => handleAddCard()}>
          Add Card
        </Button>
      </Stack>
      <Card handleClick={handleClick} handleDelete={handleDelete} cards={cards} />

      {toggleAddCard && (
        <NewCardForm open={toggleAddCard} handleClose={handleClose} userId={user.id} handleNewCard={handleNewCard} />
      )}
    </Box>
  );
};

export default Wallet;
