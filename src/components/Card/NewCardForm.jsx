import React, { useState } from "react";
import {
  Modal,
  FormControl,
  Box,
  Typography,
  InputLabel,
  Input,
  TextField,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
const NewCardForm = ({ open, handleClose, handleNewCard }) => {
  // const [bank, setBank] = useState("");
  // const [creditCard, setCreditCard] = useState("");

  const [form, setForm] = useState({
    bank: "",
    creditCardName: "",
    name: "",
    id: Math.floor(Math.random() * 1000),
  });

  const bankOptions = [
    { label: "Chase", key: "Chase", option: "Chase" },
    { label: "Bank of America", key: "Bank of America", option: "Bank of America" },
    // { label: "Wells Fargo", key: "wellsfargo", option: "Wells Fargo" },
    // { label: "Citibank", key: "citibank", option: "Citibank" },
    // { label: "HSBC", key: "hsbc", option: "HSBC" },
  ];

  const creditCardOptions = {
    Chase: {
      cards: [{ label: "Chase Sapphire Preferred", key: "chase_sapphire", option: "Chase Sapphire Preferred" }],
    },

    ["Bank of America"]: {
      cards: [
        { label: "Bank of America Cash Rewards", key: "boa_cash_rewards", option: "Bank of America Cash Rewards" },
        {
          label: "Bank of America Travel Rewards",
          key: "boa_travel_rewards",
          option: "Bank of America Travel Rewards",
        },
      ],
    },
  };
  // { label: "Chase Sapphire Preferred", key: "chase_sapphire", option: "Chase Sapphire Preferred" },
  // { label: "American Express Platinum", key: "amex_platinum", option: "American Express Platinum" },
  // { label: "Citi Double Cash Card", key: "citi_double_cash", option: "Citi Double Cash Card" },

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (form.bank === "" || form.creditCard === "") {
      return;
    }

    handleNewCard(form);
    handleClose();
  };
  const handleChange = e => {
    // console.log("e,taterge", e.target)
    setForm({ ...form, [e.target.name]: e.target.value });
    // if (e.target.name === "creditCard") {
    //   setForm({ ...form, [e.target.name]: e.target.value, name: e.target.value });
    //   return;
    // }
    // setForm({ ...form, [e.target.name]: e.target.value });
    // handleClose(true);
  };
  // console.log(creditCardOptions[form.bank]);

  let creditCardMenuItems = null;
  if (form.bank !== "") {
    creditCardMenuItems = creditCardOptions[form.bank].cards.map(card => (
      <MenuItem key={card.key} value={card.label}>
        {card.option}
      </MenuItem>
    ));
  }
  // const creditCardMenuItems =
  //   form.bank !== ""
  //     ?  creditCardOptions[form.bank].map(option => {
  //         return option.cards.map(card => (
  //           <MenuItem key={card.key} value={card.key}>
  //             {card.option}
  //           </MenuItem>
  //         ));
  //       })
  //     : null;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={style}
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
    >
      <form onSubmit={handleSubmit}>
        <Stack display={"flex"} width={"95%"} p={2} m={2} justifyContent={"space-around"} height={"300px"}>
          <Button onClick={handleClose} sx={{ position: "absolute", right: 0, top: "0", fontSize: "2rem" }}>
            X
          </Button>
          <Typography variant="h4" mb={2}>
            Make a Selection
          </Typography>
          <FormControl>
            <TextField
              select
              label="Select your bank"
              defaultValue="Select Bank"
              name="bank"
              value={form.bank}
              onChange={handleChange}
            >
              {bankOptions.map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {option.option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl>
            <TextField
              select
              label="Select your card"
              defaultValue="Select Card"
              onChange={handleChange}
              value={form.creditCardName}
              name="creditCardName"
              disabled={form.bank !== "" ? false : true}
            >
              {form.bank === "" ? <MenuItem value="Select Card" /> : creditCardMenuItems}
            </TextField>
          </FormControl>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default NewCardForm;
