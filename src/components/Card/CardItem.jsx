import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import visaImage from "../../assets/visa-cc.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const CardItem = ({ id, handleClick, handleDelete }) => {
  return (
    <Box
      border={"1px solid black"}
      borderRadius={"3px"}
      maxWidth={"100%"}
      position={"relative"}
      p={2}
      mt={"1em"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Button
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: "0",
          margin: "0",
          minWidth: 0,
        }}
        onClick={() => handleDelete(id)}
      >
        <DeleteForeverOutlinedIcon style={{ fill: "#EB5757" }} />
      </Button>
      <Box mr={2} maxWidth={"120px"}>
        <img src={visaImage} alt="card" width={"100%"} />
      </Box>

      <Stack>
        <Typography variant={"p"} mb={1}>
          3% cash back on food Freedom
        </Typography>
        <Typography variant={"p"}>2% cash back on groceries</Typography>
      </Stack>
      <Button
        sx={{
          position: "absolute",
          right: "0",
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "flex-end",
        }}
        onClick={() => {
          handleClick(id);
        }}
      >
        <NavigateNextIcon sx={{ backgroundColor: "#85BDAC", color: "black", borderRadius: "50%" }} />
      </Button>
    </Box>
  );
};

export default CardItem;
