import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CardItem from "../Card/CardItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const FavoritesItem = ({ card, categoryName, handleEdit, favoritesArray, handleNewFavorite, favoriteTitle }) => {
  const handleAddCard = () => {
    console.log("clicked");
  };
  // if (favoritesArray) {
  //   return (
  //     <Box
  //       display={"flex"}
  //       alignItems={"flex"}
  //       justifyContent={"center"}
  //       p={1.5}
  //       onClick={() => handleNewFavorite(categoryName, card)}
  //     >
  //       <Box mr={2} boxShadow={""} borderRadius={"5px"} width={"200px"}>
  //         <img src={visaImage} alt="card" width={"100%"} />
  //       </Box>
  //       <Box
  //         width={"100%"}
  //         display={"flex"}
  //         flexDirection={"column"}
  //         justifyContent={"space-evenly"}
  //         alignItems={"flex-start"}
  //       >
  //         <Typography variant={"p"}>{card.bank}</Typography>
  //         <Typography variant={"p"}>{card.creditCardName}</Typography>
  //         <Typography variant={"p"}>2% cashback on food</Typography>
  //         <Typography variant={"p"}>2% cashback on food</Typography>
  //       </Box>
  //     </Box>
  //   );
  // }

  const cardItems = card?.map(card => {
    return <CardItem key={card.id} card={card} edit={true} handleEdit={handleEdit} categoryName={categoryName} />;
  });
  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} mt={2} border={"2px solid black"} p={2}>
      <Typography variant="h5" textAlign={"left"} position={"relative"}>
        <Button
          sx={{
            // position: "absolute",
            // top: "0",
            // left: "0",
            padding: "0",
            margin: "0",
            minWidth: 0,
          }}
          onClick={() => handleDelete(card.id)}
        >
          <DeleteForeverOutlinedIcon style={{ fill: "#EB5757" }} />
        </Button>
        {""}
        {favoriteTitle}
      </Typography>

      <Box>
        <Button variant="contained" onClick={handleAddCard}>
          Add Card
        </Button>
      </Box>

      {/* <CardItem edit={true} card={card} handleEdit={handleEdit} categoryName={categoryName} /> */}
    </Box>
  );
};

export default FavoritesItem;
