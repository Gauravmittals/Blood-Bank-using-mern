// controllers/inventoryController.js
const Inventory = require('../models/inventory');
const Enquiry = require('../models/Enquiry');

exports.getDashboardSummary = async (req, res) => {
  try {
    // Total units in stock
    const totalUnitsData = await Inventory.aggregate([
      { $group: { _id: null, totalUnits: { $sum: "$units" } } }
    ]);
    const totalUnits = totalUnitsData.length > 0 ? totalUnitsData[0].totalUnits : 0;

    // Active donors count
    const activeDonors = await Enquiry.countDocuments({ type: "donor" });

    // Blood Inventory list
    const inventory = await Inventory.find({}, { bloodType: 1, units: 1, _id: 0 });

    // Critical Alerts — now showing patient requests
    const criticalAlerts = await Enquiry.find({ type: "patient" }).sort({ createdAt: -1 }).limit(5);

    // Recent Blood Requests and Donations
    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      totalUnits,
      activeDonors,
      inventory,
      criticalAlerts,
      recentEnquiries
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Dashboard summary fetch failed", details: err.message });
  }
};
