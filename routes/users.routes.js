const { Router } = require("express");
const {
  signupHandler,
  loginHandler,
  logoutHandler,
} = require("./api/users.controller");
const { userValidatorMiddleware } = require("../models/users/users.validators");

const usersRouter = Router();

usersRouter.post("/signup", userValidatorMiddleware, signupHandler);
usersRouter.post("/login", loginHandler);
usersRouter.post("/logout", logoutHandler);
usersRouter.get("/current");
usersRouter.get("/secret");

module.exports = {
  usersRouter,
};
