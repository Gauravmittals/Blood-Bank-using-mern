const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodType: String,
  ward: String,
  condition: String,
  doctor: String,
  status: String, // Stable, Critical, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
