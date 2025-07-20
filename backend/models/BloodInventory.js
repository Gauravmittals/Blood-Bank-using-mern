// models/Blood.js

const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    enum: ['donation', 'request'],
    default: 'donation'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BloodINventory', bloodSchema);
