import React, { useState, useEffect, useContext } from "react";
import Category from "../components/Category/Category";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { sendUserToBackend, curUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!curUser) {
  //     navigate("/");
  //     return;
  //   }
  // }, [curUser]);

  const handleClick = id => {
    console.log(id);
    navigate(`/card/${id}`, { state: { id } });
  };

  const handleDelete = id => {};

  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <Category handleClick={handleClick} handleDelete={handleDelete} />
      </Box>
    </Box>
  );
};

export default Dashboard;
