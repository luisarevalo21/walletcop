import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import visaImage from "../../assets/visa-cc.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const CardItem = ({ handleClick, handleDelete, card, edit, handleEdit, categoryName, favorites }) => {
  if (favorites) {
    //pass teh fvaorite card
    //then map over the users cards and display them
    //add the onclick to change the current favorite for the sepecific category
    //filter if the card is not the same as the favorite card

    return (
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} p={1.5}>
        <Box mr={2} boxShadow={""} borderRadius={"5px"} width={"200px"}>
          <img src={visaImage} alt="card" width={"100%"} />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          alignItems={"flex-start"}
        >
          <Typography variant={"p"}>{card.bank}</Typography>
          <Typography variant={"p"}>{card.creditCardName}</Typography>
          <Typography variant={"p"}>2% cashback on food</Typography>
          <Typography variant={"p"}>2% cashback on food</Typography>
        </Box>
      </Box>
    );
  }

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
        onClick={() => handleDelete(card.id)}
      >
        <DeleteForeverOutlinedIcon style={{ fill: "#EB5757" }} />
      </Button>
      <Box mr={2} maxWidth={"120px"}>
        <img src={visaImage} alt="card" width={"100%"} />
      </Box>

      <Stack>
        <Typography variant={"p"} mb={1}>
          {card.bank}
        </Typography>
        <Typography variant={"p"}>{card.creditCardName}</Typography>
      </Stack>
      {edit ? (
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
            handleEdit({
              id: card.id,
              categoryName,
              creditCardName: card.creditCardName,
              bank: card.bank,
            });
          }}
        >
          <EditIcon sx={{ backgroundColor: "#85BDAC", color: "black", borderRadius: "50%" }} />
        </Button>
      ) : (
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
            handleClick(card.id);
          }}
        >
          <NavigateNextIcon sx={{ backgroundColor: "#85BDAC", color: "black", borderRadius: "50%" }} />
        </Button>
      )}
    </Box>
  );
};

export default CardItem;
