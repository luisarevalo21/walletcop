import React, { useContext, useEffect, useState } from "react";

import { Box, Typography, Button, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/AuthContext";
const AccountPage = () => {
  const [user, setUser] = useState(null);
  const { curUser } = useContext(AuthContext);

  // useEffect(() => {
  //   // if (curUser) setUser(curUser);
  // }, [curUser]);

  if (!curUser) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        mt={2}
      >
        <Typography variant="h3">Loading details.... </Typography>
      </Box>
    );
  }
  const fullName = `${curUser.firstName} ${curUser.lastName}`;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      mt={2}
    >
      <Typography variant="h3">Account Page</Typography>
      <Stack alignItems={"center"}>
        <Box maxWidth={"50px"} borderRadius={"50%"} height={"50px"} overflow={"hidden"}>
          <img src={curUser.imageUrl} alt="uesr profile" width={"100%"} />
        </Box>
        <Typography variant="h5" mt={1}>
          {fullName}
        </Typography>
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box display={"flex"} alignItems={"center"} p={4} justifyContent={"center"}>
          <EmailIcon />
          <Typography ml={1} variant="p" fontSize={"1.2rem"} sx={{ textDecoration: "underline" }}>
            {curUser.email}
          </Typography>
        </Box>
      </Stack>

      {/* <Button variant="contained" >Edit Profile</Button> */}
    </Box>
  );
};

export default AccountPage;
