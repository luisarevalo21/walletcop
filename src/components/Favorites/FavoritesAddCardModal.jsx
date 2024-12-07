import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Stack, Button } from "@mui/material";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
import { useUser } from "@clerk/clerk-react";
import CardItem from "../Card/CardItem";
const FavoritesAddCardModal = ({ showAddNewCard, handleClose, selectedCategory, handleAddNewCard }) => {
  const api = useAxiosWithAuth();
  const { user } = useUser();
  const [usersCards, setUsersCards] = useState([]);

  useEffect(() => {
    const getUsersCards = async () => {
      const res = await fetchUsersCards();
      setUsersCards(res.data);
    };
    getUsersCards();
  }, []);
  const fetchUsersCards = async () => {
    return await api.get(`/user/${user.id}/cards`);
  };

  const style = {
    position: "absolute",
    top: "50%",
    height: "80vh",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,

    display: "flex",
    textAlign: "center",
    justifyContent: "center",
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
          overflow: "scroll",
        }}
      >
        <Button onClick={handleClose} position={"absolute"} right="0">
          X
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
                handleClick={() => handleAddNewCard(card._id, selectedCategory)}
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

// <Modal
//   open={showAddNewCard}
//   onClose={handleClose}
//   style={style}
//   sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
// >
//   <Typography variant="h4">Add a new card</Typography>
//   {/* <Box>
//     <Typography variant="h6">Card Name</Typography>
//   </Box> */}
// </Modal>
