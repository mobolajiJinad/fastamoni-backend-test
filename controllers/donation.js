const { StatusCodes } = require("http-status-codes");

const Donation = require("../models/Donation");

const viewDonationController = async (req, res) => {
  const donation = await Donation.findById(req.params.donationID);

  if (!donation || donation.donor.toString() !== req.user.userID) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Donation not found" });
  }

  res.status(StatusCodes.OK).json(donation);
};

module.exports = { viewDonationController };
