const express = require("express");
const router = express.Router();
const HospitalRequest = require("../models/HospitalRequest");
const Patient = require("../models/Patient");

// Summary Stats for Hospital
router.get("/stats", async (req, res) => {
  const requests = await HospitalRequest.find();
  const patients = await Patient.find();
  res.json({
    activeRequests: requests.length,
    patientsToday: patients.length,
    approvedToday: requests.filter(r => r.status === "Approved").length,
    pending: requests.filter(r => r.status === "Pending").length
  });
});

// Get All Requests
router.get("/requests", async (req, res) => {
  const requests = await HospitalRequest.find();
  res.json(requests);
});

// Get All Patients
router.get("/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

module.exports = router;
