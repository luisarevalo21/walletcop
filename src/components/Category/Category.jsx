import React, { useEffect, useState } from "react";
import { Box, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import CategoryItem from "./CategoryItem";
import Card from "../Card/Card";
import axios from "axios";

const Category = ({ handleClick }) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const res = await axios.get("http://localhost:3000/categories");
        console.log("res", res.data);
        setCategories(res.data);
        setIsLoadingCategories(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  //reset category state when going back here from card
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    { category: "groceries", id: 1 },
    { category: "gas", id: 2 },
    { category: "online", id: 3 },
    { category: "dining", id: 4 },
  ]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingUsersCards, setIsLoadingUsersCards] = useState(false);
  const [usersCards, setUsersCards] = useState([
    { creditCardName: "Chase Sapphire Preferred", bank: "JPMorgan Chase", id: 1 },
    { creditCardName: "American Express Platinum", bank: "American Express", id: 2 },
    { creditCardName: "Citi Double Cash Card", bank: "Citibank", id: 3 },
    { creditCardName: "Bank of America Cash Rewards", bank: "Bank of America", id: 4 },
  ]);

  const handleChange = event => {
    console.log("event triggered");
    setCategory(event.target.value);
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
          {/* <MenuItem value={"groceries"}>Groceries</MenuItem>
          <MenuItem value={"gas"}>Gas</MenuItem>
          <MenuItem value={"online"}>Online</MenuItem>
          <MenuItem value={"dining"}>Dining</MenuItem> */}

          {/* {categories.map(category => {
            return <CategoryItem key={category.id} value={category.value} label={category.value} />;
          })} */}
          {/* <CategoryItem value={"beer"} label="beer"></CategoryItem> */}
          {/* <MenuItem value={"soda"}>soda </MenuItem> */}
          {/* <MenuItem value={10}>Groceries</MenuItem>
          {/* <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}> */}
          {/* {categories.map(category => {
            // console.log("category", category);
            return <CategoryItem key={category.id} value={category.value} label={category.value} />;
          })} */}

          {/* </Box> */}
          {/* <MenuItem value={20}>Gas</MenuItem>
          <MenuItem value={30}>Online</MenuItem> */}
        </Select>
      </FormControl>

      {category && <Card handleClick={handleClick} handleDelete={handleDelete} cards={usersCards} />}
    </>
  );
};

export default Category;
