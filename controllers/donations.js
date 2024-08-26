const { StatusCodes } = require("http-status-codes");

const Donation = require("../models/Donation");

const viewAllDonationsController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    const donations = await Donation.find({ donor: req.user.userID })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(StatusCodes.OK).json(donations);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

const viewDonationsWithinPeriodController = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Provide all fields" });
    }

    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));

    const donations = await Donation.find({
      donor: req.user.userID,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .skip((pageNumber - 1) * limitNumber)
      .limit(parseInt(limitNumber));

    res.status(StatusCodes.OK).json(donations);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

module.exports = {
  viewAllDonationsController,
  viewDonationsWithinPeriodController,
};
