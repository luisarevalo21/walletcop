import { Box, Card, Stack, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoritesItem from "../components/Favorites/FavoritesItem";
import FavoritesModal from "../components/Favorites/FavoritesModal";
import FavoritesAddCardModal from "../components/Favorites/FavoritesAddCardModal";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const FavoritesPage = () => {
  const { user } = useUser();
  const api = useAxiosWithAuth();
  const [open, setOpen] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showAddNewCard, setShowAddNewCard] = useState(false);

  const [usersCards, setUsersCards] = useState([
    // { creditCardName: "Chase Sapphire Preferred", bank: "JPMorgan Chase", id: 1 },
    // { creditCardName: "American Express Platinum", bank: "American Express", id: 2 },
    // { creditCardName: "Citi Double Cash Card", bank: "Citibank", id: 3 },
    // { creditCardName: "Bank of America Cash Rewards", bank: "Bank of America", id: 4 },
  ]);
  const [loading, setLoading] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersFavorites, setUsersFavorites] = useState();

  const [usersCategories, setUsersCategories] = useState(null);

  const getUsersCategoryNames = categories => {
    return categories.map(favorite => favorite.categoryName);
  };
  useEffect(() => {
    setLoading(true);
    const getUsersFavorites = async () => {
      fetchUsersFavorites();
      // setLoading(true);
      // const response = await fetchUsersFavorites();

      // const categories = getUsersCategoryNames(response.data);

      // setUsersFavorites(response.data);
      // setUsersCategories(categories);
      // setLoading(false);
    };

    getUsersFavorites();
  }, []);

  const fetchUsersFavorites = async () => {
    setLoading(true);
    // const response = await fetchUsersFavorites();

    const cards = await api.get(`/user/${user.id}/favorites`);
    const categories = getUsersCategoryNames(cards.data);

    setUsersFavorites(cards.data);
    setUsersCategories(categories);
    setLoading(false);
    // return cards;
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
    const categoryName = selectedCategory.category;
    const response = await api.post(`/user/${user.id}/${categoryName}`, {
      categoryId: selectedCategory._id,
    });
    setUsersFavorites(response.data);
    const categories = getUsersCategoryNames(response.data);
    setUsersCategories(categories);
    setShowNewCategory(false);
  };
  const handleDeleteCategory = async categoryId => {
    const response = await api.delete(`/user/${user.id}/${categoryId}`);
    const categories = getUsersCategoryNames(response.data);

    setUsersFavorites(response.data);
    setUsersCategories(categories);
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

  const toggleAddNewCard = (categoryName, categoryId) => {
    setSelectedCategory({ categoryName, categoryId });
    setShowAddNewCard(true);
  };
  const handleAddNewCard = async (cardId, selectedCategory) => {
    console.log("cardId", cardId);
    console.log("hadnel add new card called");
    const response = await api.post(`/user/${user.id}/favorites`, {
      cardId: cardId,
      categoryName: selectedCategory.categoryName,
      categoryId: selectedCategory.categoryId,
    });

    setShowAddNewCard(false);
    if (response.status === 200) {
      fetchUsersFavorites();
    }
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

      {showAddNewCard && (
        <FavoritesAddCardModal
          showAddNewCard={showAddNewCard}
          handleClose={() => setShowAddNewCard(false)}
          selectedCategory={selectedCategory}
          handleAddNewCard={handleAddNewCard}
        />
      )}
      {open && (
        <FavoritesModal
          open={open}
          card={selectedCard}
          handleClose={handleClose}
          usersCards={usersCards}
          handleNewFavorite={handleNewFavorite}
          categoryName={selectedCard}
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
            toggleAddNewCard={toggleAddNewCard}
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
