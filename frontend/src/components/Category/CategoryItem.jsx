import React from "react";
import { Box, MenuItem } from "@mui/material";

const CategoryItem = ({ value, label }) => {
  //   console.log(props);

  //   const { value } = props;
  // console.log("value", value);
  // return <MenuItem value={label}>{label}</MenuItem>;

  return (
    <Box
      borderRadius={"50%"}
      boxShadow={"0 4 4 0 #000"}
      border={"1px solid black"}
      width={"130px"}
      height={"130px"}
      margin={2}
      display={"flex"}
      justifyContent={"center"}
      flexWrap={"wrap"}
      textAlign={"center"}
    >
      <MenuItem
        value={value}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {label}
      </MenuItem>
    </Box>
  );
};

export default CategoryItem;
