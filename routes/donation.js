const express = require("express");

const { viewDonationController } = require("../controllers/donation");

const router = express.Router();

router.route("/:donationID").get(viewDonationController);

module.exports = router;
