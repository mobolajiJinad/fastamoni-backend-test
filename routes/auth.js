const express = require("express");

const { signupController, loginController } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);

module.exports = router;
