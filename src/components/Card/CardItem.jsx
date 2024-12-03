import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import visaImage from "../../assets/visa-cc.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
const CardItem = ({ handleClick, handleDelete, card, edit, handleEdit, favorite, categoryName, favorites }) => {
  // if (favorites) {
  //   //pass teh fvaorite card
  //   //then map over the users cards and display them
  //   //add the onclick to change the current favorite for the sepecific category
  //   //filter if the card is not the same as the favorite card

  //   //update the card for the faovriet that was selected
  //   //filter our users cards that doesn't include teh current favorite card
  //   //send it back to the favorites page component

  //   return (
  //     <Box display={"flex"} alignItems={"center"} justifyContent={"center"} p={1.5}>
  //       <Box mr={2} boxShadow={""} borderRadius={"5px"} width={"200px"}>
  //         <img src={visaImage} alt="card" width={"100%"} />
  //       </Box>
  //       <Box
  //         width={"100%"}
  //         display={"flex"}
  //         flexDirection={"column"}
  //         justifyContent={"space-evenly"}
  //         alignItems={"flex-start"}
  //       >
  //         <Typography variant={"p"}>{card.bankName}</Typography>
  //         <Typography variant={"p"}>{card.creditCardName}</Typography>
  //       </Box>
  //     </Box>
  //   );
  // }

  return (
    <Box borderRadius={"3px"} mt={"1em"} maxWidth={"100%"} border={"1px solid black"} position={"relative"} p={2}>
      <Button
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: "0",
          margin: "0",
          minWidth: 0,
        }}
        onClick={() => handleDelete(card.id)}
      >
        <DeleteForeverOutlinedIcon style={{ fill: "#EB5757" }} />
      </Button>
      <Box p={2} display={"flex"} alignItems={"center"} justifyContent={"flex-start"}>
        <Box mr={2} maxWidth={"120px"}>
          <img src={card.imageUrl} alt="card" width={"100%"} />
        </Box>

        <Stack>
          <Typography variant={"p"} mb={1}>
            {card.bankName}
          </Typography>
          <Typography variant={"p"}>{card.creditCardName}</Typography>

          {/* <Box mb={1} display={"flex"} flexDirection={"column"}> */}
          {/* {card.bonuses.map(bonus => {
          return <Typography key={bonus.details}>{bonus.details}</Typography>;
        })} */}
          {/* </Box> */}
        </Stack>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Bonuses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody>
              {card.bonuses.map(bonus => (
                <TableRow key={bonus._id}>
                  <TableCell>{bonus.type}</TableCell>
                  <TableCell>{bonus.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      {/* <Box mb={1} display={"flex"} flexDirection={"column"}>
        {card.bonuses.map(bonus => {
          return (
            <Typography key={bonus.details} mb={0.75} component={"li"}>
              {bonus.details}
            </Typography>
          );
        })}
      </Box> */}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Bonuses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={1}>
            {card.bonuses.map(bonus => (
              <Typography key={bonus.details}>{bonus.details}</Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion> */}
      {edit ? (
        <Button
          sx={{
            position: "absolute",
            right: "0",
            margin: "0",
            padding: "0",
            top: "50%",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => {
            handleEdit({
              id: card.id,
              categoryName,
              creditCardName: card.creditCardName,
              bankName: card.bankName,
            });
          }}
        >
          <EditIcon sx={{ backgroundColor: "#85BDAC", color: "black", borderRadius: "50%" }} />
        </Button>
      ) : (
        <Button
          sx={{
            position: "absolute",
            right: "0",
            margin: "0",
            padding: "0",
            top: "0",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => {
            handleClick(card.id);
          }}
        >
          <NavigateNextIcon sx={{ backgroundColor: "#85BDAC", color: "black", borderRadius: "50%" }} />
        </Button>
      )}
    </Box>
  );
};

export default CardItem;
