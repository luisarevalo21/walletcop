import React from "react";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";

import { Box, Typography } from "@mui/material";
const LoginPage = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant={"h3"} mb={3}>
        Login
      </Typography>
      <>
        <SignedOut>
          <SignIn />
        </SignedOut>

        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </>

      {/* <Auth
        path="/signup"
        routing={{
          afterSignIn: "/dashboard",
          afterSignOut: "/", // Redirect to the home page after sign out
        }}
      /> */}
    </Box>
  );
};

export default LoginPage;
