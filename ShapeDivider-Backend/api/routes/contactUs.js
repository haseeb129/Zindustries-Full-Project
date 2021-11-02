const express = require("express");
const router = express.Router();
const contactUs = require("../controllers/contactUs");
router.post("/sentEmail", contactUs.sentEmail);

module.exports = router;
