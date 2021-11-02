const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  reason_for_inquiry: {
    type: String,
  },

  writingAbout: {
    type: String,
  },

  subject: {
    type: String,
  },

  message: {
    type: String,
  },
});

module.exports = mongoose.model("contactUs", contactUsSchema);
