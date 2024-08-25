const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: { type: Number, default: 10_000 },
  walletPin: { type: String, required: true },
});

walletSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(12);
  const hash = await bcryptjs.hash(this.walletPin, salt);
  this.walletPin = hash;
});

module.exports = mongoose.model("Wallet", walletSchema);
