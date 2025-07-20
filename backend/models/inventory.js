const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  bloodGroup: String,
  units: Number,

}, {
  collection: 'inventories'  // IMPORTANT: force the correct collection name
});

module.exports = mongoose.model('Inventory', inventorySchema);
