const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { gmailUser, gmailPassword } = require("../../config");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
});

const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
    throw new Error("Mail sending failed");
  }
};

module.exports = {
  sendEmail,
};
