const bcryptjs = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Donation = require("../models/Donation");
const Wallet = require("../models/Wallet");
const { sendThankYouMessage } = require("../utils");

const createDonationController = async (req, res) => {
  const { beneficiaryUsername, amount, walletPin } = req.body;
  const Intamount = parseInt(amount);

  if (isNaN(Intamount) || Intamount <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid amount!" });
  }

  const donor = await User.findById(req.user.userID);

  const beneficiary = await User.findOne({ username: beneficiaryUsername });
  if (!beneficiary) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Beneficiary not found!" });
  }

  const donorWallet = await Wallet.findOne({ user: donor._id });
  if (!donorWallet) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Donor's wallet not found!" });
  }

  const isWalletPinCorrect = await bcryptjs.compare(
    walletPin,
    donorWallet.walletPin
  );

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

  const donation = new Donation({
    donor: donor._id,
    beneficiary: beneficiary._id,
    amount: Intamount,
  });
  await donation.save();

  donorWallet.balance -= Intamount;
  await donorWallet.save();

  const beneficiaryWallet = await Wallet.findOne({ user: beneficiary._id });
  if (!beneficiaryWallet) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Beneficiary's wallet not found!" });
  }

  beneficiaryWallet.balance += Intamount;
  await beneficiaryWallet.save();

  const donations = await Donation.find({ donor: donor._id });
  if (donations.length >= 2) {
    await sendThankYouMessage(donor);
  }

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Donation successful", donorWallet });
};

module.exports = { createDonationController };
