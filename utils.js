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

module.exports = { sendThankYouMessage };
