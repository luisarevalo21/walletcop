import React, { useState, useEffect } from "react";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import Category from "../components/Category/Category";
import { Box, Typography } from "@mui/material";
import { useNavigate, redirect } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [curUser, setCurUser] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const addNewUser = async () => {
    console.log("user", user);
    const newUser = {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      googleId: user.id,
    };
    const res = await axios.post(
      "http://localhost:3000/auth/user",
      { newUser },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res", res);
  };

  useEffect(() => {
    if (user) {
    }
  });

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
