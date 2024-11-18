import React, { useEffect, useState, useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useUserData } from "../context/UserDataContext.jsx";
const ProtectedRoute = () => {
  const { hasSavedUserData, setHasSavedUserData } = useUserData();
  const storeUserData = async userData => {
    try {
      const res = await api.post("/user", userData);

      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  const api = useAxiosWithAuth();

  const { isSignedIn, user, isLoaded } = useUser();

  const auth = useAuth();
  const navigate = useNavigate();

  console.log("hassaved user", hasSavedUserData);
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const checkIfUserExists = async userData => {
      await storeUserData(userData);
      setHasSavedUserData(true);
    };

    if (isLoaded && isSignedIn && !hasSavedUserData) {
      const userData = {
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        userId: auth.userId,
      };
      checkIfUserExists(userData);
      setHasSavedUserData(true);
    }
  }, [isSignedIn, hasSavedUserData]);

  return <Outlet />;
};

export default ProtectedRoute;
