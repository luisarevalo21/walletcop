const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
