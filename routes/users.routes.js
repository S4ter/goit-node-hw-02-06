const { Router } = require("express");
const {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  verifyHandler,
  resendVerificationHandler,
} = require("./api/users.controller");
const { userValidatorMiddleware } = require("../models/users/users.validators");
const { authMiddleware } = require("../models/auth/auth.middleware");

const usersRouter = Router();

usersRouter.post("/signup", userValidatorMiddleware, signupHandler);
usersRouter.post("/login", loginHandler);
usersRouter.post("/logout", authMiddleware, logoutHandler);
usersRouter.get("/current", authMiddleware, currentHandler);
usersRouter.get("/verify/:verificationToken", verifyHandler);
usersRouter.post("/verify", resendVerificationHandler);

module.exports = {
  usersRouter,
};
