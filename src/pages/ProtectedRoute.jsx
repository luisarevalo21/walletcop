import React, { useEffect, useState, useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/signup");
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return "Loading...";

  }
  return <Outlet />;
};

export default ProtectedRoute;
