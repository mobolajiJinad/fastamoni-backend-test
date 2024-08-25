const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: { type: Number, default: 10_000 },
  transactionPin: { type: String, required: true },
});

module.exports = mongoose.model("Wallet", walletSchema);
