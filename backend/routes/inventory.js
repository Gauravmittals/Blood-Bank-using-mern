// routes/inventory.js
const express = require("express");
const router = express.Router();

const { getDashboardSummary } = require("../controller/inventoryController");

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Inventory route is working!");
});

// Dashboard summary
router.get("/dashboard/summary", getDashboardSummary);

module.exports = router;
