const { StatusCodes } = require("http-status-codes");

const Wallet = require("../models/Wallet");
const User = require("../models/User");

const walletController = async (req, res) => {
  try {
    const existingWallet = await Wallet.findOne({ user: req.user.userID })
      .lean()
      .exec();

    if (existingWallet) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "User already has a wallet", wallet: existingWallet });
    }

    const { walletPin } = req.body;

    if (!walletPin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Wallet pin is required." });
    }

    if (walletPin.length !== 5) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Wallet pin should be 5 numbers" });
    }

    const wallet = new Wallet({
      user: req.user.userID,
      walletPin,
    });

    await Promise.all([
      wallet.save(),
      User.findByIdAndUpdate(req.user.userID, { wallet: wallet._id }),
    ]);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Wallet created successfully", wallet });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

module.exports = { walletController };
