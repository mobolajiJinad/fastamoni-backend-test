const express = require("express");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

router.get("/", (req, res) => {
  const { userID } = req.user;

  res.status(StatusCodes.OK).json({ message: "test worked!" });
});

module.exports = router;
