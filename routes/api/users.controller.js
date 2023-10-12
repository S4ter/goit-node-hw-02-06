const userDao = require("../../models/users/users.dao");
const authService = require("../../models/auth/auth.service");
const multer = require("multer");
const path = require("path");
const mimetypes = require("mime-types");
const Jimp = require("jimp");
const { User } = require("../../models/users/users.model");
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
const avatarHandler = async (req, res, next) => {
  const upload = multer({ dest: "tmp/" }).single("avatar");
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send("Błąd przesyłania pliku");
    }

    try {
      const { email } = req.user;
      const filename = `${email}_${Date.now()}.${mimetypes.extension(
        req.file.mimetype
      )}`;

      const tmpPath = req.file.path;
      const avatarImage = await Jimp.read(tmpPath);
      const sendAvatarToPublic = path.join(
        __dirname,
        "../../public/avatars",
        filename
      );
      await avatarImage.resize(250, 250).writeAsync(sendAvatarToPublic);

      const updateWithAvatar = await User.findOneAndUpdate(
        { email },
        { avatarURL: `http://localhost:3000/avatars/${filename}` },
        { new: true }
      );

      console.log("avatarHandler working");
      return res.status(201).send({ user: updateWithAvatar });
    } catch (error) {
      return next(error);
    }
  });
};
module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  avatarHandler,
};
