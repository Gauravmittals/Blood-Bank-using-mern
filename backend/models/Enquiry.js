const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  type: { type: String, enum: ["donor", "request"], required: true }, // donor or request
  name: String,
  email: String,
  phone: String,
  bloodGroup: String,
  hospital: String,
  units: Number,
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
