import React, { useEffect, useState, useMemo, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { curUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!curUser) {
  //     navigate("/");
  //   }
  // }, [curUser]);

  return <Outlet />;
};

export default ProtectedRoute;
