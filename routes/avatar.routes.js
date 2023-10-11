const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const uploadPicture = multer({
  dest: path.join(__dirname, "../tmp"),
  limits: {
    fieldSize: 1048576,
  },
});

const avatarRouter = Router();

avatarRouter.post(
  "/upload",
  uploadPicture.single("picture"),
  async (req, res) => {
    console.log("working");
  }
);

module.exports = {
  avatarRouter,
};
