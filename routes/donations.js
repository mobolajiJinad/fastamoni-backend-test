const express = require("express");

const {
  viewAllDonationsController,
  viewSingleDonationController,
  viewDonationsWithinPeriodController,
} = require("../controllers/donations");

const router = express.Router();

router.route("/").get(viewAllDonationsController);
router.route("/:donationID").get(viewSingleDonationController);
router.route("/period").get(viewDonationsWithinPeriodController);

module.exports = router;
