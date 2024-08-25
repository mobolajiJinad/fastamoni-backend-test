const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const signupController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Provide all credentials" });
  }

  const user = new User({ email, username, password });

  await user.save();

  res.status(StatusCodes.CREATED).json({ user });
};

const loginController = async (req, res) => {
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

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

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
};

module.exports = {
  signupController,
  loginController,
};
