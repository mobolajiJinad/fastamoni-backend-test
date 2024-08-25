const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide a username"],
    match: [/^[a-zA-Z0-9_-]+$/, "Enter a valid username"],
    minLength: 4,
    maxLength: 12,
    unique: [true, "Username have been used."],
  },
  email: {
    type: String,
    required: [true, "Provide an email address."],
    unique: [true, "Email have been registered."],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
      "Make sure password is between 7 to 15 characters and contains at least one numeric digit and a special character",
    ],
  },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
});

userSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(12);
  const hash = await bcryptjs.hash(this.password, salt);
  this.password = hash;
});

module.exports = mongoose.model("User", userSchema);
