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
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [usersCards, setUsersCards] = useState([
    // { creditCardName: "Chase Sapphire Preferred", bank: "JPMorgan Chase", id: 1 },
    // { creditCardName: "American Express Platinum", bank: "American Express", id: 2 },
    // { creditCardName: "Citi Double Cash Card", bank: "Citibank", id: 3 },
    // { creditCardName: "Bank of America Cash Rewards", bank: "Bank of America", id: 4 },
  ]);
  const [loading, setLoading] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);

  const [usersFavorites, setUsersFavorites] = useState();

  const [usersCategories, setUsersCategories] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getUsersFavorites = async () => {
      setLoading(true);
      const response = await fetchUsersFavorites();

      const categories = response.data.map(favorite => favorite.categoryName);

      setUsersFavorites(response.data);
      setUsersCategories(categories);
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

  const handleAddNewCategory = async selectedCategory => {
    console.log("new tategory trigged");
    const response = await api.post(`/user/${user.id}/${selectedCategory}`);
    setUsersFavorites(response.data);
    setShowNewCategory(false);
  };
  const handleDeleteCategory = async categoryId => {
    const response = await api.delete(`/user/${user.id}/${categoryId}`);

    setUsersFavorites(response.data);
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
      {showNewCategory && (
        <FavoritesModal
          open={showNewCategory}
          handleClose={() => setShowNewCategory(false)}
          handleAddCategory={handleAddNewCategory}
          usersCategories={usersCategories}
          newCategory={true}
        />
      )}
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
        <Box display={"flex"} justifyContent={"center"} mb={4}>
          <Button variant="contained" onClick={() => setShowNewCategory(true)}>
            Add New Category
          </Button>
        </Box>
        {usersFavorites.map(favorite => (
          <FavoritesItem
            key={favorite._id}
            id={favorite._id}
            favorite={favorite}
            handleDeleteCategory={handleDeleteCategory}
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
