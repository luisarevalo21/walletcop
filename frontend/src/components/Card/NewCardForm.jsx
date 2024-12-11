import React, { useState, useEffect } from "react";
import { Modal, FormControl, Typography, TextField, MenuItem, Stack, Button } from "@mui/material";
import { useAxiosWithAuth } from "../../api/useAxiosWithAuth";
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
      style={style}
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
    >
      <form onSubmit={handleSubmit} className="form">
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
              disabled={form.bankName.label !== "" ? false : true}
              sx={{ width: "100%" }}
            >
              {form.bankName.label === "" ? (
                <MenuItem value="Select Card" />
              ) : (
                creditCardOptions.map(card => {
                  return (
                    <MenuItem key={card.key} value={card}>
                      {card.creditCardName} ({card.abbreviation})
                    </MenuItem>
                  );
                })
              )}
            </TextField>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            disabled={form.bankName.label === "" || form.creditCardName === "" ? true : false}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default NewCardForm;
