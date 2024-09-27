import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
const Auth = ({ routing }) => {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>

      {routing && (
        <SignedIn>
          <UserButton />
        </SignedIn>
      )}

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </>
  );
};

export default Auth;

// <header>
// <SignedOut>
//   <SignIn />
// </SignedOut>
// <SignedIn>
//   <UserButton />
//   <SignOutButton />
// </SignedIn>
// </header> */}
// {/*
{
  /* <Stack spacing={2}>
<Typography variant={"h1"}>WalletCop</Typography>
<Typography variant={"p"}>
  Our goal is to help you find the best credit card to use to maximize your cash-back benefits. No more worrying
  about which card to use for groceries vs. restaurants. With just a few taps, you’ll know which card you should
  use for your purchase!
</Typography>
</Stack>
</Box>
);
}; */
}
