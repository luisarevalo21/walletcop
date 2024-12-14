import React, { useEffect } from "react";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <SignIn path="/login" signUpForceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" />;
    </Box>
  );
};

export default LoginPage;
