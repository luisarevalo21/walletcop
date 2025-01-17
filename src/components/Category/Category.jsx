import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import CategoryItem from "./CategoryItem";
import Card from "../Card/Card";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
import CategoryModal from "./CategoryModal";
import { AuthContext } from "../../context/AuthContext";
const Category = ({ handleClick }) => {
  const { curUser } = useContext(AuthContext);
  const api = useAxiosWithAuth();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const res = await api.get("/categories");
        setCategories(res.data);

        setIsLoadingCategories(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingUsersCards, setIsLoadingUsersCards] = useState(false);
  const [usersCards, setUsersCards] = useState([]);
  const [toggleFavoriteModal, setToggleFavoriteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentFavorite, setCurrentFavorite] = useState(null);
  // i need the users id,
  //the card id,
  //and the category

  //future if its already set show modal ssaying are you sure  you want to change the card for the current category?
  const handleAddCardToFavorites = async cardId => {
    if (category) {
      //work on what will be returend when adding a card to favoriters
      //show display the heart top left, so i dont need all the cards again
      //ensure the backend is configured corectly as well to handle this case and tohers
      //as this route is used in the favorites component
      const res = await api.put(`/user/${curUser.userId}/favorites`, {
        categoryName: category.category,
        categoryId: category._id,
        cardId,
      });

      if (res.status === 200) {
        //works but issuing another fetch
        fetchUsersCategory(category);
      } else {
        console.log(res.err);
      }
    }
  };
  const handleShowCategoryModal = card => {
    setSelectedCard(card);
    setToggleFavoriteModal(true);
  };
  const fetchUsersCategory = async category => {
    if (!curUser) return;
    const res = await api.get(`/user/${curUser.userId}/cards/${category.category}`);

    const favoriteCard = res.data.find(card => card?.categoryId?.category === category?.category);
    setUsersCards(res.data);
    setCurrentFavorite(favoriteCard);
  };

  const handleChange = event => {
    setCategory(event.target.value);

    fetchUsersCategory(event.target.value);
  };
  const handleDelete = id => {
    setUsersCards(usersCards => usersCards.filter(card => card.id !== id));
  };

  if (isLoadingCategories) {
    return <Typography>Loading...</Typography>;
  }

  if (isLoadingUsersCards) {
    return <Typography>Loading Users Cards...</Typography>;
  }

  return (
    <>
      <FormControl
        fullWidth
        sx={{
          color: "#092C4C",
          fontWeight: "bold",
          textAlign: "center",
          background: "none",
          border: "none",
          boxShadow: "none",
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select value={category} label="Category" onChange={handleChange} sx={{ left: 0 }}>
          {categories.map(category => {
            return (
              <MenuItem key={category.category} value={category}>
                {category.category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {toggleFavoriteModal && (
        <CategoryModal
          toggleFavoriteModal={toggleFavoriteModal}
          setToggleFavoriteModal={setToggleFavoriteModal}
          selectedCard={selectedCard}
          currentFavorite={currentFavorite}
          category={category}
          handleAddCardToFavorites={handleAddCardToFavorites}
        />
      )}
      {category && (
        <Card
          handleClick={handleClick}
          handleDelete={handleDelete}
          cards={usersCards}
          selectedCategory={category}
          categoryPage={true}
          handleAddCardToFavorites={handleAddCardToFavorites}
          handleShowCategoryModal={handleShowCategoryModal}
          favoriteCard={currentFavorite}
        />
      )}
    </>
  );
};

export default Category;
