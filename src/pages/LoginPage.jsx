import React, { useContext, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { signInWithGoogle, curUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (curUser) {
      navigate("/categories");
    }
  }, []);

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} height={"50vh"}>
      <Typography variant="h5">Welcome to WalletCop</Typography>
      <Typography variant="p">Please login with google</Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: ".75em",
        }}
        onClick={signInWithGoogle}
      >
        Login in with Google
      </Button>
    </Box>
  );
};

export default LoginPage;

//   <div
//     id="g_id_onload"
//     data-client_id="<client ID>"
//     data-context="signin"
//     data-ux_mode="popup"
//     data-callback="handleSignInWithGoogle"
//     data-nonce=""
//     data-auto_select="true"
//     data-itp_support="true"
//     data-use_fedcm_for_prompt="true"
//   ></div>

//   <div
//     className="g_id_signin"
//     data-type="standard"
//     data-shape="pill"
//     data-theme="outline"
//     data-text="signin_with"
//     data-size="large"
//     data-logo_alignment="left"
//   ></div>
