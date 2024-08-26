const express = require("express");

const { createDonationController } = require("../controllers/donate");

const router = express.Router();

router.post("/", createDonationController);

module.exports = router;
