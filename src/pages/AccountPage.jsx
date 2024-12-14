import React from "react";

import { Box, Typography, Button, Stack } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AccountPage = () => {
  const { user } = useUser();

  const fullName = `${user.firstName} ${user.lastName}`;
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
          <img src={user.imageUrl} alt="uesr profile" width={"100%"} />
        </Box>
        <Typography variant="h5" mt={1}>
          {fullName}
        </Typography>
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box display={"flex"} alignItems={"center"} p={4} justifyContent={"center"}>
          <EmailIcon />
          <Typography ml={1} variant="p" fontSize={"1.2rem"} sx={{ textDecoration: "underline" }}>
            {user.emailAddresses[0].emailAddress}
          </Typography>
        </Box>
      </Stack>

      {/* <Button variant="contained" >Edit Profile</Button> */}
    </Box>
  );
};

export default AccountPage;
