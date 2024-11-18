require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { clerkMiddleware, requireAuth } = require("@clerk/express");

const connectDB = require("./db/index");
const cardRouter = require("./routes/CardRouter");
const categoryRouter = require("./routes/CategoryRouter");
const bankRouter = require("./routes/bankRouter");
const userRouter = require("./routes/userRouter");
const signInRouter = require("./routes/signInRouter");

connectDB();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/auth-state", (req, res) => {
  const authState = req.auth;
  return res.json(authState);
});

app.get("/protected", requireAuth(), (req, res) => {
  res.send("This is a protected route");
});

// Error handling middleware function
app.use((err, req, res, next) => {
  console.log("error occured");
  console.error(err.stack);
  return res.status(401).send("Unauthenticated!");
});
app.use("/auth", signInRouter); // Use the signInRouter for authentication routes

app.use("/cards", requireAuth(), cardRouter);
app.use("/categories", requireAuth(), categoryRouter);
app.use("/cards", requireAuth(), cardRouter);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  console.log("email", email);
  console.log("sign up called");
});
app.use("/user", userRouter);
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
