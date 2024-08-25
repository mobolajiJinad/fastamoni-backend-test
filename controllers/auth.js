const bcryptjs = require("bcryptjs");
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

  res.status(StatusCodes.CREATED).json({ username });
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

  res.status(StatusCodes.OK).json({ username: user.username });
};

module.exports = {
  signupController,
  loginController,
};
