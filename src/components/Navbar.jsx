import React, { useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Sidebar open={open} setOpen={setOpen} />

      <Box direction={"row"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box position={"absolute"} left={3} fontSize={"2rem"}>
          <MenuIcon
            sx={{
              width: "2rem",
              height: "2rem",
            }}
            onClick={() => setOpen(!open)}
          />
        </Box>
        <Typography variant={"h3"} textAlign={"center"}>
          {user && user.firstName}'s Portal
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
