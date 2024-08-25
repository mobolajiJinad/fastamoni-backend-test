require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
