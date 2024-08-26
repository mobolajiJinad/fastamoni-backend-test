const express = require("express");

const { viewDonationController } = require("../controllers/donation");

const router = express.Router();

router.get("/:donationID", viewDonationController);

module.exports = router;
