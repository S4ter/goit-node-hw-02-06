const userDao = require("../../models/users/users.dao");

const signupHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const createdUser = await userDao.createUser({ email, password });
  console.log(createdUser);
  return res.status(201).send({
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  });
};
const loginHandler = (req, res, next) => {
  return res.send({ message: "login working" });
};
const logoutHandler = (req, res, next) => {
  return res.send({ message: "logout working" });
};
module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
};
