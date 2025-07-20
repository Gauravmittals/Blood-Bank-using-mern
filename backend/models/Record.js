const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  hospital: { type: String, required: true },
  charge: { type: Number, required: true },
  supervisor: { type: String, required: true },
  signature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Record", recordSchema);
