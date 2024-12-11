import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedOut } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
      padding={2}
      textAlign={"center"}
    >
      <Typography variant="h1" component="h1" mb={2} mt={0} sx={{ fontSize: "4.5rem" }}>
        WalletCop
      </Typography>
      <Typography variant={"p"}>
        Our goal is to help you find the best credit card to use to maximize your cash-back benefits. No more worrying
        about which card to use for groceries vs. restaurants. With just a few taps, you’ll know which card you should
        use for your purchase!
      </Typography>
      <Box display={"flex"} justifyItems={"center"} mt={2}>
        <SignedOut>
          <Link to="/login">
            <Button variant="outlined">Login</Button>
          </Link>

          <Link to="/signup">
            <Button variant="contained" sx={{ ml: ".5em" }}>
              Sign Up
            </Button>
          </Link>
        </SignedOut>
      </Box>
    </Box>
    // </Container>
  );
};

export default HomePage;
