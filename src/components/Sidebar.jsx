import React, { useState } from "react";
import { Box, Typography, Stack, Link } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WalletIcon from "@mui/icons-material/Wallet";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = ({ open, setOpen }) => {
  //   if (!open) {
  //     return <></>;
  //   }
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      className={`sidebar ${open ? "show_side_bar" : ""}`}
      zIndex={999}
      onClick={() => setOpen(false)}
      //   border={"4px solod black"}
      //   bgcolor={"#BAC6D5"}
      //   maxWidth={"50%"}
      p={2}
      opacity={0.8}
    >
      <img
        src="https://www.clerk.dev/static/images/logo.svg"
        alt="Clerk.dev Logo"
        style={{ width: "100px", height: "100px" }}
      />
      <Stack
        spacing={3}
        direction={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        textTransform={"capitalize"}
        color={"black"}
      >
        <Link
          href={"/"}
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
        >
          about
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
          href={"/dashboard"}
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"1.2rem"}
          sx={{ textDecoration: "none", color: "black" }}
        >
          <HomeIcon sx={{ mr: "4px" }} /> Dashboard
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
      </Stack>
    </Box>
  );
};

export default Sidebar;
