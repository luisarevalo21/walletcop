import React, { useState } from "react";
import { Box, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";

const Category = () => {
  const [category, setCategory] = useState("");

  const handleChange = event => {
    setCategory(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={category} label="Category" onChange={handleChange}>
        <MenuItem value={10}>Groceries</MenuItem>
        <MenuItem value={20}>Gas</MenuItem>
        <MenuItem value={30}>Online</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Category;
