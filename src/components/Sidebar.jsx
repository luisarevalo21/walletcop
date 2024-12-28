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
import { logout } from "../api/useAxiosWithAuth";
const Sidebar = ({ open, setOpen }) => {
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

      <Box display={"flex"} flexDirection={"column"} textAlign={"center"} mt={2} mb={3} width={"100%"}>
        <Typography variant="p" fontSize={"13px"}></Typography>
      </Box>
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

        <Link
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
          onClick={() => logout()}
        >
          <LogoutIcon sx={{ mr: "4px" }} />
          Sign out
        </Link>

        <Link
          href="/login"
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <LoginIcon sx={{ mr: "4px" }} />
          Login
          {/* <SignInButton>Login/Sign Up</SignInButton> */}
        </Link>
        <Link
          href="/signup"
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <LoginIcon sx={{ mr: "4px" }} />
          Signup
          {/* <SignInButton>Login/Sign Up</SignInButton> */}
        </Link>
      </Stack>
    </Box>
  );
};

export default Sidebar;
