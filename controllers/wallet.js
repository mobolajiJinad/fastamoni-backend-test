const bcryptjs = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const Wallet = require("../models/Wallet");
const User = require("../models/User");

const walletController = async (req, res) => {
  const { transactionPin } = req.body;
  const hashedPin = await bcryptjs.hash(transactionPin, 10);

  const wallet = new Wallet({
    user: req.user.userID,
    transactionPin: hashedPin,
  });
  await wallet.save();

  const user = await User.findByIdAndUpdate(req.user.userID, {
    wallet: wallet._id,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Wallet created successfully", wallet });
};

module.exports = { walletController };
