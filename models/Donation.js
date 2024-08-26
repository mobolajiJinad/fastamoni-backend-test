const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [0.01, "Donation amount must be greater than 0"],
    },
    date: { type: Date, default: Date.now, immutable: true },
  },
  {
    timestamps: true,
  }
);

donationSchema.index({ donor: 1, beneficiary: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Donation", donationSchema);
