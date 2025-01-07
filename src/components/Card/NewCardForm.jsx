import React, { useState, useEffect } from "react";
import { Modal, FormControl, Typography, TextField, MenuItem, Stack, Button } from "@mui/material";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
import CloseIcon from "@mui/icons-material/Close";

import "../../index.css";
const NewCardForm = ({ open, handleClose, handleNewCard }) => {
  const [form, setForm] = useState({
    bankName: "",
    bankId: "",
    creditCardName: "",
    creditCardId: "",
    name: "",
    // id: Math.floor(Math.random() * 1000),
  });
  const [bankOptions, setBankOptions] = useState([]);
  const [creditCardOptions, setCreditCardOptions] = useState([]);

  const api = useAxiosWithAuth();
  useEffect(() => {
    fetchBanks();
  }, []);

  useEffect(() => {
    fetchCreditCardOptions();
  }, [form.bankName]);

  const fetchBanks = async () => {
    const res = await api.get("/banks");

    const options = res.data.map(bank => {
      return {
        label: bank.bankName,
        key: bank._id,
        option: bank.abbreviation,
      };
    });

    setBankOptions(options);
  };

  const fetchCreditCardOptions = async () => {
    if (form.bankName) {
      const bankName = form.bankName.label;
      const res = await api.get(`/banks/${bankName}`);

      const filteredCards = res.data.map(card => {
        return {
          creditCardName: card.creditCardName,
          key: card._id,
          bankName: card.bankName,
          abbreviation: card.abbreviation,
        };
      });
      setCreditCardOptions(filteredCards);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (form.bankName || form.creditCardName) {
      handleNewCard(form);
      // api.post(`/user/${userId}`, form);
      // return;
    }

    setForm({
      bankName: "",
      bankId: "",
      creditCardName: "",
      creditCardId: "",
      name: "",
    });
    handleClose();
  };
  const handleChange = e => {
    if (e.target.name === "bankName") {
      setForm({ ...form, bankName: e.target.value, bankId: e.target.value.key });
    } else if (e.target.name === "creditCardName") {
      setForm({ ...form, creditCardName: e.target.value, creditCardId: e.target.value.key });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "95%",
          maxWidth: "500px",
          background: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        <Stack spacing={2}>
          <Button onClick={handleClose} sx={{ position: "absolute", right: "0px", top: "0px", minWidth: "auto" }}>
            <CloseIcon
              sx={{
                borderRadius: "50%",
                backgroundColor: "black",
                fontWeight: "bold",
                fill: "white",
              }}
            />
          </Button>
          <Typography variant="h5" textAlign="center">
            Make a Selection
          </Typography>
          <FormControl>
            <TextField
              select
              label="Select your bank"
              defaultValue="Select Bank"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
            >
              {bankOptions.map(option => (
                <MenuItem key={option.key} value={option}>
                  {option.label} ({option.option})
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
              disabled={!form.bankName.label}
            >
              {creditCardOptions.map(card => (
                <MenuItem key={card.key} value={card}>
                  {card.creditCardName} ({card.abbreviation})
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Button variant="contained" type="submit" disabled={!form.bankName.label || !form.creditCardName}>
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default NewCardForm;
