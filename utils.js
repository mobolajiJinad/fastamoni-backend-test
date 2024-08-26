const nodemailer = require("nodemailer");

const sendThankYouMessage = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Thank You for Your Donations!",
    text: "We appreciate your generosity!",
  };

  await transporter.sendMail(mailOptions);
};

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { sendThankYouMessage, notFoundHandler, errorHandler };
