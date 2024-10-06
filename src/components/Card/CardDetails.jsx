import React, { useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import visaImage from "../../assets/visa-cc.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const CardDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("params", params);
  }, []);

  return (
    <Box
    // display={"flex"}
    // justifyContent={"center"}
    // alignContent={"center"}
    // alignItems={"center"}
    // flexDirection={"column"}
    >
      {/* <Box display={"flex"} alignItems={"center"}>
        <Button>
          <ArrowBackIosIcon />
        </Button>
        <Typography variant="h3" color="#092C4C" textAlign={"center"}>
          Card Benefits
        </Typography>
      </Box> */}

      <Box direction={"row"} display={"flex"} alignItems={"center"} mt={4} justifyContent={"center"}>
        <Button
          sx={{
            padding: "0",
            margin: "0",
          }}
          onClick={() => {
            //maintain previous state
            navigate("/dashboard");
          }}
        >
          <ArrowBackIosIcon
            sx={{
              width: "2rem",
              height: "2rem",
              margin: "0",
              padding: "0",
            }}
          />
        </Button>
        <Typography variant="h3" color="#092C4C" textAlign={"center"}>
          Card Benefits
        </Typography>
      </Box>

      <Stack maxWidth={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box mb={2} mt={3} width={"200px"}>
          <img src={visaImage} alt="card" width={"100%"} />
        </Box>

        <Box mb={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"p"} mb={1}>
            3% cash back on food Freedom
          </Typography>
          <Typography variant={"p"}>2% cash back on groceries</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CardDetails;
