const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide a username"],
      match: [/^[a-zA-Z0-9_-]+$/, "Enter a valid username"],
      minlength: [4, "Username must be at least 4 characters long"],
      maxlength: [15, "Username cannot exceed 12 characters"],
      unique: [true, "Username have been used."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Provide an email address."],
      unique: [true, "Email have been registered."],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcryptjs.genSalt(12);
      this.password = await bcryptjs.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
