const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 10_000,
      min: [0, "Balance cannot be negative"],
    },
    walletPin: {
      type: String,
      required: [true, "Wallet PIN is required"],
    },
  },
  {
    timestamps: true,
  }
);

walletSchema.pre("save", async function (next) {
  if (this.isModified("walletPin")) {
    try {
      const salt = await bcryptjs.genSalt(12);
      this.walletPin = await bcryptjs.hash(this.walletPin, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

walletSchema.methods.compareWalletPin = async function (candidatePin) {
  return bcryptjs.compare(candidatePin, this.walletPin);
};

module.exports = mongoose.model("Wallet", walletSchema);
