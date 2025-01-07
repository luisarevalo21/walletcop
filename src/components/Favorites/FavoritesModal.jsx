import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Button, SvgIcon, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CardItem from "../Card/CardItem";
import CloseIcon from "@mui/icons-material/Close";
import FavoritesItem from "./FavoritesItem";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
const FavoritesModal = ({
  open,
  handleClose,
  card,
  usersCards,
  handleNewFavorite,
  categoryName,
  newCategory,
  usersCategories,
  handleAddCategory,
  handleEditCard,
  allowEdit,
  selectedCard,
}) => {
  const api = useAxiosWithAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetchCategories();
      const categories = res.data.filter(category => !usersCategories.includes(category.category));

      setCategories(categories);
    };
    getCategories();
  }, []);

  const fetchCategories = async () => {
    return api.get("/categories");
  };
  const handleChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handleAddNewCategory = e => {
    e.preventDefault();
    handleAddCategory(selectedCategory);
    setSelectedCategory("");
  };

  if (newCategory) {
    return (
      <Modal
        onClose={handleClose}
        open={open}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <form
          onSubmit={handleAddNewCategory}
          style={{
            width: "95%",
            maxWidth: "500px",
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          }}
        >
          <Box
            position="relative"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Button
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: "0px",
                top: "0px",
                fontSize: "1.5rem",
                minWidth: "auto",
                padding: "0",
              }}
            >
              <CloseIcon
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "black",
                  fontWeight: "bold",
                }}
                style={{ fill: "white" }}
              />
            </Button>
            <FormControl
              fullWidth
              sx={{
                color: "#092C4C",
                fontWeight: "bold",
                textAlign: "center",
                background: "none",
                border: "none",
                boxShadow: "none",
                marginTop: "2.5em",
                marginBottom: "1.5em",
              }}
            >
              <InputLabel>Categories</InputLabel>
              <Select value={selectedCategory} label="Category" onChange={handleChange} sx={{ left: 0 }}>
                {categories.map(category => {
                  return (
                    <MenuItem key={category.category} value={category}>
                      {category.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiBackdrop-root": { backgroundColor: "transparent" },
        width: "400px",
        padding: "1em .75em",
        overflow: "scroll",
        height: "100%",
      }}
      style={style}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            display: "flex",
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
        <Typography variant="h4" textAlign={"center"} mt={4}>
          Changing Favorite for {card.categoryName}
        </Typography>
        <Typography variant="h6" mt={3}>
          Current Favorite for {card.categoryName}
        </Typography>
        <CardItem card={card} favorites favoritesModal={true} noEdit={true} />
        <Typography variant="h6" mt={3}>
          Tap a Different Card Below to Change Favorite Card
        </Typography>
        {usersCards.map(card => (
          <CardItem
            card={card}
            favoritesArray={true}
            edit={false}
            handleNewFavorite={handleNewFavorite}
            key={card.id}
            categoryName={categoryName}
            favorites={true}
            noEdit={true}
            favoritesModal={true}
            handleEditCard={handleEditCard}
            allowEdit={allowEdit}
            allowClick={true}
            selectedCard={selectedCard}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default FavoritesModal;
