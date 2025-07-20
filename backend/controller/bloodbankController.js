const Inventory = require('../models/inventory');
const Enquiry = require('../models/Enquiry');

const getBloodBankInfo = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    console.log('📦 Inventory fetched:', inventory); // 👈

    const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);

    res.status(200).json({
      totalUnits,
      inventory,
    });
  } catch (error) {
    console.error('Error in getBloodBankInfo:', error);
    res.status(500).json({ error: 'Failed to fetch blood bank data' });
  }
};


module.exports = {
  getBloodBankInfo
};
