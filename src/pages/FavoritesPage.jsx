import { Box, Card, Stack, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoritesItem from "../components/Favorites/FavoritesItem";
import FavoritesModal from "../components/Favorites/FavoritesModal";
import FavoritesAddCardModal from "../components/Favorites/FavoritesAddCardModal";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useUser } from "@clerk/clerk-react";

const FavoritesPage = () => {
  const { user } = useUser();
  const api = useAxiosWithAuth();
  const [open, setOpen] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showAddNewCard, setShowAddNewCard] = useState(false);

  const [usersCards, setUsersCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersFavorites, setUsersFavorites] = useState([]);

  const [usersCategories, setUsersCategories] = useState(null);

  const getUsersCategoryNames = categories => {
    return categories.map(favorite => favorite.categoryName);
  };
  useEffect(() => {
    setLoading(true);
    const getUsersFavorites = async () => {
      fetchUsersFavorites();
    };

    getUsersFavorites();
    fetchUsersCards();
  }, []);

  const fetchUsersCards = async () => {
    setLoading(true);
    const cards = await api.get(`/user/${user.id}/cards`);
    setUsersCards(cards.data);
    setLoading(false);
  };
  const fetchUsersFavorites = async () => {
    setLoading(true);

    const cards = await api.get(`/user/${user.id}/favorites`);
    const categories = getUsersCategoryNames(cards.data);

    setUsersFavorites(cards.data);
    setUsersCategories(categories);
    setLoading(false);
  };
  const handleEditCard = async cardDetails => {
    const response = await api.put(`/user/${user.id}/favorites`, cardDetails);
    setOpen(false);
    setUsersFavorites(response.data);
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

  const handleDeleteCard = async (cardId, categoryId) => {
    const response = await api.delete(`/user/${user.id}/favorites/${cardId}`, { data: { categoryId: categoryId } });

    setUsersFavorites(response.data);
  };

  const handleToggleEditModal = card => {
    setOpen(true);
    setUsersCards(prev => prev.filter(prevCard => prevCard._id !== card.creditCardId));
    setSelectedCard(card);
  };
  const handleNewFavorite = (categoryName, card) => {
    // setOpen(false);
    // setSelectedCard(null);
    // //set the favorites array with the new card
    // const newFavorites = favorites.map(favorite => {
    //   if (favorite.categoryName === categoryName) {
    //     return { categoryName: categoryName, card: card };
    //   }
    //   return favorite;
    // });
    // setFavorites(newFavorites);
  };

  const toggleAddNewCard = (categoryName, categoryId) => {
    setSelectedCategory({ categoryName, categoryId });
    setShowAddNewCard(true);
  };
  const handleAddNewCard = async (cardId, selectedCategory) => {
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
          handleDeleteCard={handleDeleteCard}
        />
      )}
      {open && (
        <FavoritesModal
          open={open}
          card={selectedCard}
          selectedCard={selectedCard}
          handleClose={handleClose}
          usersCards={usersCards}
          handleNewFavorite={handleNewFavorite}
          usersCategories={usersCategories}
          handleEditCard={handleEditCard}
          allowEdit={true}
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
            handleDeleteCard={handleDeleteCard}
            handleEditCard={handleEditCard}
            handleToggleEditModal={handleToggleEditModal}
            allowEdit={false}
          />
        ))}
      </Box>
    </>
  );
};

export default FavoritesPage;
