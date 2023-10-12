const gravatar = require("gravatar");
const { User } = require("./users.model");

class DuplicatedKeyError extends Error {
  constructor(keyName, value) {
    super(`${keyName} has to be unique. ${value} is already taken.`);
  }
}

class UnknownDatabase extends Error {
  constructor() {
    super(`Error, something happened at database layer.`);
  }
}

const createUser = async (userData) => {
  try {
    const avatarURL = gravatar.url(
      `${userData.email}`,
      { default: "identicon" },
      true
    );
    const userBody = {
      email: userData.email,
      password: userData.password,
      avatarURL: avatarURL,
    };
    return await User.create(userBody);
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      const [[key, value]] = Object.entries(error.keyValue);
      throw new DuplicatedKeyError(key, value);
    }
    throw new UnknownDatabase();
  }
};
const getUser = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.log(error);
    throw new UnknownDatabase();
  }
};
const updateUser = async (email, userData) => {
  try {
    return await User.findOneAndUpdate({ email }, userData);
  } catch (error) {
    console.log(error);
    throw new UnknownDatabase();
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  DuplicatedKeyError,
  UnknownDatabase,
};
