const userDao = require("../../models/users/users.dao");
const authService = require("../../models/auth/auth.service");
const { sendUserVerificationMail } = require("../../models/users/user.mailer");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });
    await sendUserVerificationMail(
      createdUser.email,
      createdUser.verificationToken
    );
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
    const userInfo = await userDao.getUser({ email: req.body.email });
    const isUserPasswordValid = await userInfo.validatePassword(
      req.body.password
    );
    if (!userInfo || !isUserPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials." });
    }
    if (!userInfo.verify) {
      return res.status(401).send({ message: "Email is not verified" });
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
const logoutHandler = async (req, res, next) => {
  try {
    const { email } = req.user;

    await userDao.updateUser(email, { token: null });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
const currentHandler = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    await res.status(200).send({ user: { email, subscription } });
  } catch (error) {
    return next(error);
  }
};
const verifyHandler = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userDao.getUser({ verificationToken });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Verification token is no valid or expired" });
    }
    if (user.verified) {
      return res.status(400).send({ message: "Email is already verified" });
    }
    await userDao.updateUser(user.email, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).send({ message: "Email has beed verified" });
  } catch (error) {}
};
const resendVerificationHandler = async (req, res, next) => {
  try {
    const user = await userDao.getUser({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User with this email does not exist" });
    }
    if (user.verify) {
      return res.status(400).send({ message: "Email is already verified" });
    }
    await sendUserVerificationMail(user.email, user.verificationToken);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  verifyHandler,
  resendVerificationHandler,
};
