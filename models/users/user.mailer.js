const { sendEmail } = require("../mailer/mailer.service");

const sendUserVerificationMail = async (email, verificationToken) => {
  const mailOptions = {
    to: email,
    subject: "Welcome, please verify your email",
    text: `Hello!, please verify your email by visiting http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<h2>Hello!</h2><br/> please verify your email by visiting <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a>.`,
  };
  await sendEmail(mailOptions);
};
module.exports = {
  sendUserVerificationMail,
};
