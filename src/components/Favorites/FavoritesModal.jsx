import React from "react";
import { Box, Typography, Modal, Button, SvgIcon } from "@mui/material";
import CardItem from "../Card/CardItem";
import CloseIcon from "@mui/icons-material/Close";
import FavoritesItem from "./FavoritesItem";
const FavoritesModal = props => {
  const { open, handleClose, card, usersCards, handleNewFavorite, categoryName } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,

    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  console.log("categoryName", categoryName);
  return (
    // <Modal
    //   onClose={handleClose}
    //   open={open}
    //   style={style}
    //   //   sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
    // >
    //   {/* <Typography variant="h6">Changing Favorite for {categoryName}</Typography>

    //   <Box>
    //     <Typography variant="h3">Current Favorite for {categoryName}</Typography>

    //     <CardItem card={card} />
    //   </Box>

    //   <Box>
    //     <Typography variant="h3">Tap a Different Card Below to Change Favorite Card</Typography>

    //     <CardItem card={usersCards} handleNewFavorite={handleNewFavorite} />
    //   </Box> */}
    // </Modal>

    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiBackdrop-root": { backgroundColor: "transparent" },
        width: "400px",
        padding: "1em .75em",
        overflow: "scroll",
        height: "80%",
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
          Changing Favorite for {categoryName}
        </Typography>
        <Typography variant="h6" mt={3}>
          Current Favorite for {categoryName}
        </Typography>
        <CardItem card={card} favorites />
        <Typography variant="h6" mt={3}>
          Tap a Different Card Below to Change Favorite Card
        </Typography>
        {usersCards.map(card => (
          <FavoritesItem
            card={card}
            favoritesArray={true}
            edit={false}
            handleNewFavorite={handleNewFavorite}
            key={card.id}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default FavoritesModal;

{
  /* <Typography variant="h6">Tap a Different Card Below to Change Favorite Card</Typography> */
}

{
  /* <CardItem card={usersCards} handleNewFavorite={handleNewFavorite} /> */
}
{
  /* <Typography id="modal-title" variant="h6" component="h2">
  {card.creditCardName}
</Typography>
<Typography id="modal-description" sx={{ mt: 2 }}>
  Bank: {card.bank}
</Typography>
<Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
  Close
</Button> */
}
