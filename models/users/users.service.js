const User = require("./users.model");

const listUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const currentUser = async (token) => {
  try {
    return await User.find(token);
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = {
  listUsers,
  currentUser,
};
