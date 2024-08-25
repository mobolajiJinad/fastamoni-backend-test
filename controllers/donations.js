const { StatusCodes } = require("http-status-codes");

const Donation = require("../models/Donation");

const viewAllDonationsController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const donations = await Donation.find({ donor: req.user.userID })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(StatusCodes.OK).json(donations);
};

const viewDonationsWithinPeriodController = async (req, res) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;

  const donations = await Donation.find({
    donor: req.user.userID,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.status(StatusCodes.OK).json(donations);
};

module.exports = {
  viewAllDonationsController,
  viewDonationsWithinPeriodController,
};
