import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (SignedIn) {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return (
    <Container maxWidth="lg">
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        // width={"100vw"}
        height={"100vh"}
        padding={2}
      >
        <Typography variant={"h1"} component={"h1"}>
          WalletCop
        </Typography>
        <Typography variant={"p"}>
          Our goal is to help you find the best credit card to use to maximize your cash-back benefits. No more worrying
          about which card to use for groceries vs. restaurants. With just a few taps, you’ll know which card you should
          use for your purchase!
        </Typography>
        <Box display={"flex"} justifyItems={"center"} mt={2}>

          <SignedOut>
            <SignInButton>
              <Button variant="outlined">Login</Button>
            </SignInButton>

            <SignInButton>
              <Button variant="contained" sx={{ ml: ".5em" }}>
                Sign Up
              </Button>
            </SignInButton>
          </SignedOut>
// =======
//             <SignInButton>
//               <Button variant="contained" sx={{ ml: ".5em" }}>
//                 Sign Up
//               </Button>
//             </SignInButton>
//           </SignedOut>
//           {/* <SignInButton>
//             <Button variant="outlined" onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           </SignInButton>

//           <SignInButton>
//             <Button variant="contained" sx={{ ml: ".5em" }}>
//               Sign Up
//             </Button>
//           </SignInButton> */}
// >>>>>>> main
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
