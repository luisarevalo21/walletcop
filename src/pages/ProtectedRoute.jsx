import React, { useEffect, useState, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  // const storeUserData = async userData => {
  //   try {
  //     const res = await api.post("/user", userData);

  //     return;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoaded, isSignedIn]);

  // useEffect(() => {
  //   const checkIfUserExists = async userData => {
  //     await storeUserData(userData);
  //     setHasSavedUserData(true);
  //   };

  //   if (isLoaded && isSignedIn && !hasSavedUserData) {
  //     const userData = {
  //       email: user.emailAddresses[0].emailAddress,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       imageUrl: user.imageUrl,
  //       userId: auth.userId,
  //     };
  //     checkIfUserExists(userData);
  //     setHasSavedUserData(true);
  //   }
  // }, [isSignedIn, hasSavedUserData]);

  return <Outlet />;
};

export default ProtectedRoute;
