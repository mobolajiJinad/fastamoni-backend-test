const express = require("express");

const { signupController, loginController } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;
