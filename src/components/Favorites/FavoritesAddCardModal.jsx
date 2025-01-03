import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Modal, Stack, Button } from "@mui/material";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
import CardItem from "../Card/CardItem";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
const FavoritesAddCardModal = ({
  showAddNewCard,
  handleClose,
  selectedCategory,
  handleAddNewCard,
  handleDeleteCard,
  allowClick,
}) => {
  const { curUser } = useContext(AuthContext);
  const api = useAxiosWithAuth();
  const [usersCards, setUsersCards] = useState([]);

  useEffect(() => {
    if (!curUser) return;
    const getUsersCards = async () => {
      const res = await fetchUsersCards();
      setUsersCards(res.data);
    };
    getUsersCards();
  }, [curUser]);

  const fetchUsersCards = async () => {
    return await api.get(`/user/${curUser.userId}/cards`);
  };

  const style = {
    position: "absolute",
    width: "95%",

    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    margin: "0 auto",

    // display: "flex",
    // textAlign: "center",
    // justifyContent: "center",
  };

  return (
    <Modal
      onClose={handleClose}
      open={showAddNewCard}
      style={style}
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
    >
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          // justifyContent: "center",
          "flex-direction": "column",
          overflow: "auto",
          height: "100%",
          position: "relative",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "0",
            top: "5px",
          }}
        >
          <CloseIcon
            sx={{
              color: "red",
              borderRadius: "50%",
              backgroundColor: "black",
              fontWeight: "bold",
            }}
            style={{ fill: "white" }}
          />
        </Button>
        <Stack spacing={1} mt={2}>
          <Typography variant="h4" sx={{ fontSize: "20px" }}>
            Changing Favorite for:{" "}
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              {selectedCategory.categoryName}
            </Typography>
          </Typography>

          <Typography variant="h6" sx={{ fontSize: "16px" }}>
            Tap a Different Card Below to Change Favorite Card
          </Typography>
        </Stack>
        <Box>
          {/* <Typography variant="h3">Current Favorite for {categoryName}</Typography> */}

          {usersCards.map(card => {
            return (
              <CardItem
                card={card}
                favorites={true}
                key={card._id}
                handleAddNewCard={() => handleAddNewCard(card._id, selectedCategory)}
                favoritesModal={true}
                allowClick={true}
              />
            );
          })}
          {/* {usersCards.legnth !== 0 && <CardItem card={usersCards} favorites={true} />} */}
        </Box>

        <Box>{/* <CardItem card={usersCards} handleNewFavorite={handleNewFavorite} /> */}</Box>
      </Box>
    </Modal>
  );
};

export default FavoritesAddCardModal;
