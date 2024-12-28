import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const AuthButtons = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  return (
    <>
      <Button onClick={signInWithGoogle} variant="contained">
        Sign up with Google
      </Button>
      <Button onClick={signInWithGoogle} variant="outlined">
        Sign in with Google
      </Button>
    </>
  );
};

export default AuthButtons;
