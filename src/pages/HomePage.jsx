import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AuthButtons from "../components/AuthButtons.jsx";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { curUser, logout } = useContext(AuthContext);

  console.log("cur user", curUser);
  useEffect(() => {
    if (curUser) {
      navigate("/dashboard");
    }
  }, [curUser]);
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
      <Typography variant={"p"}>Find the best credit card to use to maximize cash-back benefits.</Typography>
      <Box display={"flex"} justifyItems={"center"} mt={2}>
        {!curUser ? (
          <AuthButtons />
        ) : (
          <>
            <Button onClick={logout} variant="contained">
              Sign Out
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
