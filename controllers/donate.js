const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Donation = require("../models/Donation");
const Wallet = require("../models/Wallet");
const { sendThankYouMessage } = require("../utils");

const createDonationController = async (req, res) => {
  try {
    const { beneficiaryUsername, amount, walletPin } = req.body;

    if (!beneficiaryUsername || !amount || !walletPin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Provide all required fields" });
    }

    const Intamount = parseInt(amount);
    if (isNaN(Intamount) || Intamount <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid amount!" });
    }

    const [donor, beneficiary, donorWallet] = await Promise.all([
      User.findById(req.user.userID),
      User.findOne({ username: beneficiaryUsername }),
      Wallet.findOne({ user: req.user.userID }),
    ]);

    if (!donor || !beneficiary || !donorWallet) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: donor
          ? beneficiary
            ? "Donor's wallet not found!"
            : "Beneficiary not found!"
          : "Donor not found!",
      });
    }

    const isWalletPinCorrect = await donorWallet.compareWalletPin(walletPin);
    if (!isWalletPinCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid wallet pin!" });
    }

    if (donorWallet.balance < Intamount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Insufficient balance!" });
    }

    donorWallet.balance -= Intamount;
    const beneficiaryWallet = await Wallet.findOne({ user: beneficiary._id });

    if (!beneficiaryWallet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Beneficiary's wallet not found!" });
    }

    beneficiaryWallet.balance += Intamount;

    const donation = new Donation({
      donor: donor._id,
      beneficiary: beneficiary._id,
      amount: Intamount,
    });

    await Promise.all([
      donation.save(),
      donorWallet.save(),
      beneficiaryWallet.save(),
    ]);

    const donationCount = await Donation.countDocuments({ donor: donor._id });
    if (donationCount >= 2) {
      await sendThankYouMessage(donor);
    }

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Donation successful", donorWallet });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

module.exports = { createDonationController };
