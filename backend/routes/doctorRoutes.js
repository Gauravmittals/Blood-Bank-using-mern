const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const BloodInventory = require("../models/BloodInventory");

router.get("/dashboard", async (req, res) => {
  const patients = await Patient.find();
  const bloodInventory = await BloodInventory.find();
  const schedule = [
    { time: "10:00", name: "Anil Kumar", bloodType: "B+", purpose: "Review" },
    { time: "11:30", name: "Geeta Devi", bloodType: "O-", purpose: "Follow-up" }
  ];
  const summary = {
    patients: patients.length,
    appointments: schedule.length,
    requests: 5,
    critical: patients.filter(p => p.status === "Critical").length
  };
  res.json({ patients, bloodInventory, schedule, summary });
});

module.exports = router;