const { StatusCodes } = require("http-status-codes");

const Donation = require("../models/Donation");

const viewDonationController = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.donationID)
      .lean()
      .exec();

    if (!donation || donation.donor.toString() !== req.user.userID) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Donation not found" });
    }

    res.status(StatusCodes.OK).json(donation);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

module.exports = { viewDonationController };
