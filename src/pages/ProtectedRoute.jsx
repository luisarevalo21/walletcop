import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
