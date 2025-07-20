const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry"); // adjust path as needed

router.get("/bloodbankinfo", async (req, res) => {
  try {
    const donors = await Enquiry.find({ type: "donor" });
    const requests = await Enquiry.find({ type: "request" });

    const inventoryMap = {};

    // Add donor units
    donors.forEach((item) => {
      const bg = item.bloodGroup.toUpperCase();
      inventoryMap[bg] = (inventoryMap[bg] || 0) + Number(item.units);
    });

    // Subtract requested units
    requests.forEach((item) => {
      const bg = item.bloodGroup.toUpperCase();
      inventoryMap[bg] = (inventoryMap[bg] || 0) - Number(item.units);
    });

    // Convert to array for frontend
    const inventory = Object.entries(inventoryMap)
      .filter(([_, units]) => units > 0)
      .map(([bloodType, units]) => ({ bloodType, units }));

    res.status(200).json(inventory);
  } catch (err) {
    console.error("Inventory fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
