import React, { useState, useEffect } from "react";
import { SignedIn, SignOutButton, useUser } from "@clerk/clerk-react";
import Category from "../components/Category";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [curUser, setCurUser] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useEffect", isSignedIn);
    if (isSignedIn && isLoaded) {
      setCurUser(user);
    }
    if (!isSignedIn && isLoaded) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to the Dashboard</h1>

        {isSignedIn && <SignOutButton />}
      </header>

      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        {/* {console.log(curUser)} */}

        <Category />
      </Box>
    </div>
  );
};

export default Dashboard;
