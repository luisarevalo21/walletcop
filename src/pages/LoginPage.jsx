import React, { useEffect } from "react";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  // const { isSignedIn, user, isLoaded } = useUser();

  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      // Locate user in your database
      fetch("http://localhost:3000/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("User data:", data);
          navigate("/dashboard");
        })
        .catch(err => console.error("Error finding user:", err));
    }
  }, [isSignedIn, user, navigate]);
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <SignIn path="/login" signUpForceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" />;
    </Box>
  );
};

export default LoginPage;
