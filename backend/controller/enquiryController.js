const bloodGroup = enquiry.bloodGroup;
const units = Math.abs(parseInt(enquiry.units)); // Ensure positive number

let inventory = await Inventory.findOne({ bloodGroup });

if (!inventory) {
  inventory = new Inventory({ bloodGroup, units: 0 });
}

if (enquiry.type === 'donor') {
  inventory.units += units;
} else if (enquiry.type === 'request') {
  inventory.units -= units;
  if (inventory.units < 0) inventory.units = 0; // Avoid negative
}

await inventory.save();
