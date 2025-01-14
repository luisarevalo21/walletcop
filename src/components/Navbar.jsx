import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { curUser } = useContext(AuthContext);
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

        {curUser && location.pathname.startsWith("/categories") && (
          <Typography variant={"h3"} textAlign={"center"}>
            {curUser?.firstName}&#39;s Portal
          </Typography>
        )}
        {curUser && location.pathname.startsWith("/favorites") && (
          <Typography variant={"h3"} textAlign={"center"}>
            Favorites
          </Typography>
        )}
        {curUser && location.pathname.startsWith("/wallet") && (
          <Typography variant={"h3"} textAlign={"center"}>
            Wallet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
