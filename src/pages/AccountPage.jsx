import React from "react";

import { Box, Typography, Button } from "@mui/material";

const AccountPage = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
      <Typography variant="h3">Account Page</Typography>
      <Box>
        <img src="image" alt="" />
      </Box>

      <Box>
        <Box>
          icon
          <Typography>email</Typography>
        </Box>
        <Box>
          icon
          <Typography>email</Typography>
        </Box>
        <Box>
          icon
          <Typography>email</Typography>
        </Box>
      </Box>

      <Button variant="contained">Edit Profile</Button>
    </Box>
  );
};

export default AccountPage;
