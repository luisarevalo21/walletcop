import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import visaImage from "../../assets/visa-cc.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";

const CardDetails = () => {
  const api = useAxiosWithAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCardDetails = async () => {
      setLoading(true);
      const card = await getCardDetails();
      setSelectedCard(card.data);
      setLoading(false);
    };
    fetchCardDetails();
  }, []);

  const getCardDetails = async () => {
    return await api.get(`/cards/card/${params.id}`);
  };
  console.log("selectedCard", selectedCard);
  console.log("loading", loading);
  if (loading) {
    return (
      <Box>
        <Typography>Loading Card Details...</Typography>
      </Box>
    );
  }
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
            navigate(-1);
            // navigate("/dashboard");
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
          <img src={selectedCard?.imageUrl} alt="card" width={"100%"} />
        </Box>

        <Box mb={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Stack textAlign={"center"}>
            <Typography variant={"h5"} textAlign={"center"} mb={2}>
              {selectedCard.creditCardName}
            </Typography>
            <Typography variant={"h5"}> {selectedCard.bankName}</Typography>
            <Typography variant={"h5"}> {selectedCard.abbreviation}</Typography>
          </Stack>

          <Typography variant="h5" mt={2}>
            Bonuses:
          </Typography>
          <Table>
            <TableBody>
              {selectedCard.bonuses.map(bonus => (
                <TableRow key={bonus._id}>
                  <TableCell>{bonus.type}</TableCell>
                  <TableCell>{bonus.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h5" mt={2}>
            Bonuses:
          </Typography>
          <Table
            sx={{
              textAlign: "center",
            }}
          >
            <TableBody>
              {selectedCard.benefits.map(benefit => (
                <TableRow key={benefit}>
                  <TableCell
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {benefit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant={"h5"} mt={2}>
            Annual Fee: {selectedCard.annualFee}
          </Typography>
          <Table>
            <TableBody>
              <TableRow key={selectedCard.fees._id}>
                <TableCell>{selectedCard.fees.annualFee}</TableCell>
                <TableCell>{selectedCard.fees.balanceTransferFee}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};

export default CardDetails;
