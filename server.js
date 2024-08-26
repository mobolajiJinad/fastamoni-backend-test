require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const donateRoutes = require("./routes/donate");
const donationRoutes = require("./routes/donation");
const donationsRoutes = require("./routes/donations");
const authorize = require("./middleware/authorize");
const { notFoundHandler, errorHandler } = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", authorize, walletRoutes);
app.use("/api/v1/donate", authorize, donateRoutes);
app.use("/api/v1/donation", authorize, donationRoutes);
app.use("/api/v1/donations", authorize, donationsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

start();
