require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  return res.status(StatusCodes.CREATED).json({ message: "Successful" });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
