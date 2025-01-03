import React, { useState, useContext } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import NewCardForm from "../components/Card/NewCardForm";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { AuthContext } from "../context/AuthContext";
const Wallet = () => {
  const { curUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const api = useAxiosWithAuth();

  const [toggleAddCard, setToggleAddCard] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!curUser) return;

    const getUserCards = async () => {
      const response = await fetchUsersCards(curUser);
      setCards(response?.data || []);
    };

    getUserCards();
  }, [curUser]);

  // useEffect(() => {}, []);

  const handleClick = async id => {
    navigate(`/card/${id}`, { state: { id } });
    // await api.get("/card/673bd769fe445011fac7834f");
  };

  const fetchUsersCards = async user => {
    try {
      if (user) {
        const cards = await api.get(`/user/${user.userId}/cards`);
        return cards;
      }
    } catch (err) {
      console.error("error fetching userse cards", err);
      return [];
    }
    return [];
  };

  const handleAddCard = () => {
    setToggleAddCard(prev => !prev);
  };

  const handleClose = () => {
    setToggleAddCard(false);
  };
  const handleDelete = async id => {
    console.log(curUser.userId);
    const res = await api.delete(`/user/${curUser.userId}/card/${id}`);
    if (res.status === 200) {
      setCards(cards => cards.filter(card => card.id !== id));
    }
  };
  const handleNewCard = async form => {
    try {
      const res = await api.post(`/user/${curUser.userId}/newcard`, {
        creditCardId: form.creditCardId,
      });

      if (res.data.success) {
        const updatedCards = await fetchUsersCards(curUser);
        setCards(updatedCards.data);
        return;
      }
      if (!res.data.success) {
        alert("Card already exists try another card");
        return;
      }
    } catch (err) {
      throw new Error(err.message);
    }
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
        <NewCardForm open={toggleAddCard} handleClose={handleClose} userId={curUser.id} handleNewCard={handleNewCard} />
      )}
    </Box>
  );
};

export default Wallet;
