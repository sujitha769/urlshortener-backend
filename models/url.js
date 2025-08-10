const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30 // Document expires in 30 days
  }
});
module.exports = mongoose.model("Url", urlSchema);