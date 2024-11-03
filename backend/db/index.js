const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://arevaloluis89:lSWg56u577LX3n3N@cluster0.8gubd.mongodb.net/walletcop?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;
