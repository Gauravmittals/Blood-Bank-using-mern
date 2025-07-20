const mongoose = require("mongoose");

const hospitalRequestSchema = new mongoose.Schema({
  hospitalName: String,
  bloodType: String,
  units: Number,
  priority: String, // High, Medium, Low
  status: String,   // Pending, Approved, Rejected
  patient: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HospitalRequest", hospitalRequestSchema);
