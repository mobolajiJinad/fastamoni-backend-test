const express = require("express");

const { createDonationController } = require("../controllers/donate");

const router = express.Router();

router.route("/").post(createDonationController);

module.exports = router;
