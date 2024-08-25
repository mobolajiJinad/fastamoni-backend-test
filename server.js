require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const donateRoutes = require("./routes/donate");
const donationRoutes = require("./routes/donations");
const authorize = require("./middleware/authorize");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", authorize, walletRoutes);
app.use("/api/v1/donate", authorize, donateRoutes);
app.use("/api/v1/donations", authorize, donationRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
