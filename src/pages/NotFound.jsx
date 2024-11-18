import React from "react";

import { Box, Typography } from "@mui/material";
const NotFound = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0 auto"} flexDirection={"column"}>
      <Typography variant={"h1"}>404</Typography>
      <Typography variant={"h4"}>Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;
