import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import AuthButtons from "../components/AuthButtons.jsx";
const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    const { user, session, error } = supabase.auth
      .signInWithOAuth({
        provider: "google",
      })
      .then(response => {
        console.log(response);
      });
    console.log(user, session, error);
  };
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <AuthButtons />
      {/* <Button variant="outlined" onClick={handleSignUp}>
        Sign up with google
      </Button> */}
    </Box>
  );
};

export default SignUpPage;
