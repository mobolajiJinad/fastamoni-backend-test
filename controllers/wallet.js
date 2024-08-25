const bcryptjs = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const Wallet = require("../models/Wallet");
const User = require("../models/User");

const walletController = async (req, res) => {
  const existingWallet = await Wallet.findOne({ user: req.user.userID });

  if (existingWallet) {
    return res
      .status(StatusCodes.OK)
      .json({ message: "User already has a wallet", wallet: existingWallet });
  }

  const { walletPin } = req.body;

  const wallet = new Wallet({
    user: req.user.userID,
    walletPin,
  });
  await wallet.save();

  await User.findByIdAndUpdate(req.user.userID, {
    wallet: wallet._id,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Wallet created successfully", wallet });
};

module.exports = { walletController };
