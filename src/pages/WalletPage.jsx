import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import Card from "../components/Card/Card";

const Wallet = () => {
  const [toggleAddCard, setToggleAddCard] = useState(false);
  //fetch users cards
  useEffect(() => {}, []);
  const handleClick = id => {
    console.log("clicked", id);
    // navigate(`/card/${id}`);
  };

  const handleDelete = id => {
    console.log("delete", id);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      <Stack mt={4}>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Add Card
        </Button>
      </Stack>
      <Card handleClick={handleClick} handleDelete={handleDelete} />
    </Box>
  );
};

export default Wallet;
