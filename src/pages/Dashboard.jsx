import React, { useState, useEffect } from "react";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import Category from "../components/Category/Category";
import { Box, Typography } from "@mui/material";
import { useNavigate, redirect } from "react-router-dom";

const Dashboard = () => {
  const [curUser, setCurUser] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      setCurUser(user);
    }
  }, []);

  const handleClick = id => {
    console.log("clicked", id);
    navigate(`/card/${id}`, { state: { id } });
  };

  const handleDelete = id => {
    console.log("delete", id);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <Category handleClick={handleClick} handleDelete={handleDelete} />
      </Box>
    </Box>
  );
};

export default Dashboard;
