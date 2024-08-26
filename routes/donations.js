const express = require("express");

const {
  viewAllDonationsController,
  viewDonationsWithinPeriodController,
} = require("../controllers/donations");

const router = express.Router();

router.get("/", viewAllDonationsController);
router.get("/period", viewDonationsWithinPeriodController);

module.exports = router;
