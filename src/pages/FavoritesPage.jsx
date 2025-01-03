import { Box, Card, Stack, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import FavoritesItem from "../components/Favorites/FavoritesItem";
import FavoritesModal from "../components/Favorites/FavoritesModal";
import FavoritesAddCardModal from "../components/Favorites/FavoritesAddCardModal";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { AuthContext } from "../context/AuthContext";

const FavoritesPage = () => {
  const api = useAxiosWithAuth();
  const { curUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showAddNewCard, setShowAddNewCard] = useState(false);

  const [usersCards, setUsersCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersFavorites, setUsersFavorites] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [usersCategories, setUsersCategories] = useState(null);

  const getUsersCategoryNames = categories => {
    return categories.map(favorite => favorite.categoryName);
  };

  useEffect(() => {
    if (!curUser) return;
    setLoading(true);
    const getUsersFavorites = async () => {
      console.log("get users favorites was called");
      fetchUsersFavorites();
    };

    getUsersFavorites();
    fetchUsersCards();
  }, [curUser]);

  const fetchUsersCards = async () => {
    setLoading(true);
    const cards = await api.get(`/user/${curUser.userId}/cards`);
    setUsersCards(cards.data);
    setOriginalCards(cards.data);
    setLoading(false);
  };
  const fetchUsersFavorites = async () => {
    setLoading(true);

    const cards = await api.get(`/user/${curUser.userId}/favorites`);
    const categories = getUsersCategoryNames(cards.data);

    setUsersFavorites(cards.data);
    setUsersCategories(categories);
    setLoading(false);
  };
  const handleEditCard = async cardDetails => {
    const response = await api.put(`/user/${curUser.userId}/favorites`, cardDetails);
    setOpen(false);
    setUsersFavorites(response.data);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handleAddNewCategory = async selectedCategory => {
    const categoryName = selectedCategory.category;
    const response = await api.post(`/user/${curUser.userId}/${categoryName}`, {
      categoryId: selectedCategory._id,
    });
    setUsersFavorites(response.data);
    const categories = getUsersCategoryNames(response.data);
    setUsersCategories(categories);
    setShowNewCategory(false);
  };
  const handleDeleteCategory = async categoryId => {
    const response = await api.delete(`/user/${curUser.userId}/${categoryId}`);
    const categories = getUsersCategoryNames(response.data);

    setUsersFavorites(response.data);
    setUsersCategories(categories);
  };

  const handleDeleteCard = async (cardId, categoryId) => {
    const response = await api.delete(`/user/${curUser.userId}/favorites/${cardId}`, {
      data: { categoryId: categoryId },
    });

    setUsersFavorites(response.data);
  };

  const handleToggleEditModal = card => {
    setOpen(true);
    //something to do wiht the
    setUsersCards(() => originalCards.filter(prevCard => prevCard._id !== card.creditCardId));
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
    const response = await api.post(`/user/${curUser.userId}/favorites`, {
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
          allowClick={true}
        />
      )}
      {showAddNewCard && (
        <FavoritesAddCardModal
          showAddNewCard={showAddNewCard}
          handleClose={() => setShowAddNewCard(false)}
          selectedCategory={selectedCategory}
          handleAddNewCard={handleAddNewCard}
          handleDeleteCard={handleDeleteCard}
          allowClick={true}
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
      <Box justifyContent={"center"} alignItems={"center"} p={2} width={"100%"}>
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
            handleAddNewCard={handleAddNewCard}
            allowEdit={false}
            allowClick={false}
          />
        ))}
      </Box>
    </>
  );
};

export default FavoritesPage;
