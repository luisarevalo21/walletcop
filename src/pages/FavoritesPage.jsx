import { Box, Card, Stack, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoritesItem from "../components/Favorites/FavoritesItem";
import FavoritesModal from "../components/Favorites/FavoritesModal";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useAuth, useUser } from "@clerk/clerk-react";

const FavoritesPage = () => {
  const { user } = useUser();
  const api = useAxiosWithAuth();
  const [open, setOpen] = useState(false);
  const [usersCards, setUsersCards] = useState([
    // { creditCardName: "Chase Sapphire Preferred", bank: "JPMorgan Chase", id: 1 },
    // { creditCardName: "American Express Platinum", bank: "American Express", id: 2 },
    // { creditCardName: "Citi Double Cash Card", bank: "Citibank", id: 3 },
    // { creditCardName: "Bank of America Cash Rewards", bank: "Bank of America", id: 4 },
  ]);
  const [loading, setLoading] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);

  const [usersFavorites, setUsersFavorites] = useState();

  useEffect(() => {
    setLoading(true);
    const getUsersFavorites = async () => {
      const response = await fetchUsersFavorites();

      setUsersCards(response.data);
      setLoading(false);
    };

    getUsersFavorites();
  }, []);

  const fetchUsersFavorites = async () => {
    const cards = await api.get(`/user/${user.id}/favorites`);
    return cards;
  };
  const handleEdit = card => {
    setOpen(true);
    setSelectedCard(card);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handleNewFavorite = (categoryName, card) => {
    setOpen(false);
    setSelectedCard(null);

    //set the favorites array with the new card
    const newFavorites = favorites.map(favorite => {
      if (favorite.categoryName === categoryName) {
        return { categoryName: categoryName, card: card };
      }
      return favorite;
    });
    setFavorites(newFavorites);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {open && (
        <FavoritesModal
          open={open}
          card={selectedCard}
          handleClose={handleClose}
          usersCards={usersCards}
          handleNewFavorite={handleNewFavorite}
          categoryName={selectedCard.categoryName}
        />
      )}
      <Box flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={2} width={"100%"}>
        <Button variant="contained">Add New Category</Button>
        {usersFavorites.map(favorite => (
          <FavoritesItem
            key={favorite}
            // favoriteTitle={favorite}
            // card={usersCards}
            // card={favorite.card}
            // handleEdit={handleEdit}
            // categoryName={favorite.categoryName}
            // favoritesArray={true}
          />
        ))}
      </Box>
    </>
  );
};

export default FavoritesPage;

// <Stack>
//   <Typography variant="h3">Restaurant</Typography>
//   {/* <CardItem></CardItem> */}
// </Stack>
// <Stack>
//   <Typography variant="h3">Online Purchases</Typography>
//   {/* <CardItem></CardItem> */}
// </Stack>
// <Stack>
//   <Typography variant="h3">Gas</Typography>
//   {/* <CardItem></CardItem> */}
// </Stack>
