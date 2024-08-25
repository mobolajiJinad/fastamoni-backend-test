const express = require("express");

const {
  viewAllDonationsController,
  viewDonationsWithinPeriodController,
} = require("../controllers/donations");

const router = express.Router();

router.route("/").get(viewAllDonationsController);
router.route("/period").get(viewDonationsWithinPeriodController);

module.exports = router;
