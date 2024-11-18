import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { SignedIn, SignedOut, SignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { isSignedIn } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <SignUp path="/signup" />
    </Box>
  );
};

export default SignUpPage;
