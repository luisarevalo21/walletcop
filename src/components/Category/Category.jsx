import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import CategoryItem from "./CategoryItem";
import Card from "../Card/Card";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";

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

  const fetchUsersCategory = async category => {
    if (!curUser) return;
    const res = await api.get(`/user/${curUser.userId}/cards/${category}`);
    setUsersCards(res.data);
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
              <MenuItem key={category.category} value={category.category}>
                {category.category}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {category && (
        <Card handleClick={handleClick} handleDelete={handleDelete} cards={usersCards} categoryPage={true} />
      )}
    </>
  );
};

export default Category;
