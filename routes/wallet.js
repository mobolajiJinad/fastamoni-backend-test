const express = require("express");

const { walletController } = require("../controllers/wallet");

const router = express.Router();

router.route("/").post(walletController);

module.exports = router;
