import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const SignUpPage = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <Typography variant="h5">Welcome to WalletCop</Typography>
      <Typography variant="p">Please sign up with google</Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: ".75em",
        }}
        onClick={signInWithGoogle}
      >
        Sign up with Google
      </Button>
    </Box>
  );
};

export default SignUpPage;
