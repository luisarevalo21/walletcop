import React from "react";
import { Box, Typography } from "@mui/material";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <Typography variant={"h3"} mb={3}>
        Sign Up
      </Typography>
      <>
        <SignedOut>
          <SignIn />
        </SignedOut>

        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </>
    </Box>
  );
};

export default SignUpPage;
