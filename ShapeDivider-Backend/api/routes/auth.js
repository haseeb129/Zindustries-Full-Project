const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const authController = require("../controllers/auth");
const middleware = require("../middleware/block");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./EmialAttachments/");
    console.log("aaaaaaaaaaa");
  },
  filename: function (req, file, cb) {
    cb(null, new mongoose.Types.ObjectId() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/getAllUsers", authController.getAllUsers);
router.patch("/updatePassword", authController.updatePassword);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/googleLogin", authController.googleLogin);
router.post(
  "/SentEmailToAll",
  upload.fields([{ name: "attachedFiles" }]),
  authController.SentEmailToAll
);
router.patch("/updateDownloadModel", authController.updateDownloadModel);
router.patch("/updateUserProfile", authController.updateUserProfile);
router.post("/getuserById", authController.getuserById);

module.exports = router;
