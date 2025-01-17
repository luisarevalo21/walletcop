import React, { useEffect, useState, useMemo, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { curUser, loading } = useContext(AuthContext);
  console.log("cur user", curUser);
  // console.log("loading", loading);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // console.log("curuser", curUser);
  // useEffect(() => {
  // }, []);
  if (!curUser) {
    navigate("/");
  }
  // if (!curUser) {
  //   navigate("/");
  // }

  // useEffect(() => {
  //   if (!curUser) {
  //     navigate("/");
  //   }
  // }, [curUser]);

  return <Outlet />;
};

export default ProtectedRoute;
