const JWT = require("jsonwebtoken");
const { jwtSecret, jwtLifetime } = require("../../config");

const generateAccessToken = (user) => {
  return JWT.sign(user, jwtSecret, { expiresIn: jwtLifetime ?? "1h" });
};

module.exports = {
  generateAccessToken,
};
