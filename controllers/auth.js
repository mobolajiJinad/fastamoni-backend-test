const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Provide all credentials" });
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!passwordRegex.test(password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "Password must be 7-15 characters long, with at least one numeric digit and a special character",
      });
    }

    const user = new User({ email, username, password });

    await user.save();

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Provide all credentials" });
    }

    let query;
    if (/^\S+@\S+\.\S+$/.test(usernameOrEmail)) {
      // Input looks like an email address
      query = { email: usernameOrEmail };
    } else {
      // Input looks like a username
      query = { username: usernameOrEmail };
    }

    const user = await User.findOne(query);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userID: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

module.exports = {
  signupController,
  loginController,
};
