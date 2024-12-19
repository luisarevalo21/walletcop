import React, { useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Box>
      <Sidebar open={open} setOpen={setOpen} />

      <Box direction={"row"} display={"flex"} justifyContent={"center"} alignItems={"center"} mt={4}>
        <Box position={"absolute"} left={3} fontSize={"2rem"}>
          <MenuIcon
            sx={{
              width: "2rem",
              height: "2rem",
            }}
            onClick={() => setOpen(!open)}
          />
        </Box>

        {user && location.pathname.startsWith("/dashboard") && (
          <Typography variant={"h3"} textAlign={"center"} sx={{ color: "#092C4C" }}>
            {user.firstName}&#39;s Portal
          </Typography>
        )}

        {location.pathname.startsWith("/wallet") && (
          <Typography variant={"h3"} textAlign={"center"}>
            Wallet
          </Typography>
        )}
        {location.pathname.startsWith("/favorites") && (
          <Typography variant={"h3"} textAlign={"center"}>
            Favorites
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
