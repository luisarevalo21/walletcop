import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
const LoginPage = () => {
  const navigate = useNavigate();
  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   // if (event !== "SIGNED_IN") {
  //   // } else {
  //   // }
  // });

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <div
        id="g_id_onload"
        data-client_id="<client ID>"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </Box>
  );
};

export default LoginPage;
