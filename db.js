const mongoose = require("mongoose");
const { mongoConnectionString } = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to connect with database");
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
    throw new Error("Cannot disconnect from database!");
  }
};

module.exports = {
  connect,
  disconnect,
};
