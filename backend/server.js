const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const connectDB = require("./db/index");
const Card = require("./models/cards.js");
const Category = require("./models/categories.js");
const Bank = require("./models/banks.js");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/cards", async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

app.get("/add-card", async (req, res) => {
  const card = new Card({
    creditCardName: "Chase Platnium",
    bank: "Chase",
  });

  card
    .save()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});
app.get("/banks", async (req, res) => {
  try {
    const banks = await Bank.find({});
    res.json(banks);
  } catch (err) {
    console.error("Error fetching banks:", err);
    res.status(500).json({ message: "Failed to fetch banks" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
