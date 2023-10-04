const userDao = require("../../models/users/users.dao");
const authService = require("../../models/auth/auth.service");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });
    console.log(createdUser);
    return res.status(201).send({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    });
  } catch (error) {
    const { message } = error;
    if (error instanceof userDao.DuplicatedKeyError) {
      return res.status(409).send({ message });
    }
    return next(error);
  }
};
const loginHandler = async (req, res, next) => {
  try {
    const userInfo = await userDao.getUser(req.body.email);
    const isUserPasswordValid = await userInfo.validatePassword(
      req.body.password
    );
    if (!userInfo || !isUserPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials." });
    }
    const userPayload = {
      email: userInfo.email,
      subscription: userInfo.subscription,
    };
    const token = authService.generateAccessToken(userPayload);
    await userDao.updateUser(userInfo.email, { token });

    return res.status(200).send({ token, user: userPayload });
  } catch (error) {
    return next(error);
  }
};
const logoutHandler = (req, res, next) => {
  return res.send({ message: "logout working" });
};
module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
};
