import React from "react";
import { Modal, Box, Typography, Button, Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardItem from "../Card/CardItem";

const CategoryModal = ({ toggleFavoriteModal, setToggleFavoriteModal, currentFavorite, selectedCard, category, handleAddCardToFavorites }) => {
  return (
    <Modal
      open={toggleFavoriteModal}
      onClose={() => setToggleFavoriteModal(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
        mt: "2em",
        "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        style={{
          width: "95%",
          maxWidth: "600px",
          background: "white",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        <Typography variant="h4" component={"h1"} textAlign={"center"}>
          Change Preferred Card
        </Typography>
        <Box>
          <Typography variant="h6" component={"h4"} mt={".5em"}>
            Your current card for the Category:{" "}
            <Typography variant="span" fontWeight={"bold"}>
              {category.category}
            </Typography>{" "}
            is the following:
          </Typography>

          <CardItem card={currentFavorite} basicCard={true} />
        </Box>
        <Box>
          <Typography variant="h6" component={"h4"}>
            Would you like to switch to:
          </Typography>
          <CardItem card={selectedCard} basicCard={true} />
        </Box>

        <Button onClick={() => setToggleFavoriteModal(false)} sx={{ position: "absolute", right: "0px", top: "0px", minWidth: "auto" }}>
          <CloseIcon
            sx={{
              borderRadius: "50%",
              backgroundColor: "black",
              fontWeight: "bold",
              fill: "white",
            }}
          />
        </Button>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button
            variant="outlined"
            sx={{
              marginRight: ".5em",
            }}
            onClick={() => setToggleFavoriteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleAddCardToFavorites(selectedCard._id);
              setToggleFavoriteModal(false);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
