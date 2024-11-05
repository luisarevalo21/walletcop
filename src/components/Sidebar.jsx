import React, { useState } from "react";
import { Box, Typography, Stack, Link, Button, Divider } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WalletIcon from "@mui/icons-material/Wallet";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import avatar from "../assets/avatar.jpg";
import { SignedIn, SignedOut, SignOutButton, SignInButton, useUser } from "@clerk/clerk-react";
const Sidebar = ({ open, setOpen }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  // console.log("user", user);
  // //   if (!open) {
  // //     return <></>;
  // //   }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      className={`sidebar ${open ? "show_side_bar" : ""}`}
      zIndex={999}
      alignItems={"center"}
      onClick={() => setOpen(false)}
      p={2}
      opacity={0.8}
    >
      <Button
        onClick={() => setOpen(false)}
        sx={{ position: "absolute", right: "0", padding: 0, minWidth: 0, top: "1" }}
      >
        <CloseIcon />
      </Button>

      <SignedIn>
        <img
          src={user?.imageUrl}
          alt="User Profile"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "1px solid black",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Box display={"flex"} flexDirection={"column"} textAlign={"center"} mt={2} mb={3} width={"100%"}>
          <Typography variant="h4">{user?.firstName}</Typography>
          <Typography variant="p" fontSize={"13px"}>
            {user?.emailAddresses[0].emailAddress}
          </Typography>
        </Box>
      </SignedIn>
      <Divider sx={{ border: "1px solid white", width: "100%" }} />
      <Stack
        spacing={3}
        direction={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        textTransform={"capitalize"}
        color={"black"}
        mt={4}
      >
        <Link
          href={"/"}
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <InfoIcon sx={{ mr: "4px" }} /> About
        </Link>
        <SignedIn>
          <Link
            href={"/dashboard"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"1.2rem"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <DashboardIcon sx={{ mr: "4px" }} /> Dashboard
          </Link>
          <Link
            href={"/wallet"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"1.2rem"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <WalletIcon sx={{ mr: "4px" }} /> Wallet
          </Link>
          <Link
            href={"/favorites"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"1.2rem"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <FavoriteIcon sx={{ mr: "4px" }} /> Favorites
          </Link>

          <Link
            href={"/account"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"1.2rem"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <AccountBoxIcon sx={{ mr: "4px" }} /> Account
          </Link>
        </SignedIn>
        <SignedIn>
          <SignOutButton>
            <Link
              href="/"
              textAlign={"center"}
              display={"flex"}
              alignItems={"center"}
              fontSize={"1.2rem"}
              sx={{ textDecoration: "none", color: "black" }}
            >
              <LogoutIcon sx={{ mr: "4px" }} />
              Log out
            </Link>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <Link
            href="/login"
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"1.2rem"}
            sx={{ textDecoration: "none", color: "black" }}
          >
            <LoginIcon sx={{ mr: "4px" }} />
            <SignInButton>Login/Sign Up</SignInButton>
          </Link>
        </SignedOut>
      </Stack>
    </Box>
  );
};

export default Sidebar;
