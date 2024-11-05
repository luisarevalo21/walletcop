const mongoose = require("mongoose");
//defines the strucutre of the document
//model wraps around the schema
//constructor function
//model will be absed on the schema
//schema is the blueprint
//model is the actual object
//which allwos us to communicate with the database
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    creditCardName: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
