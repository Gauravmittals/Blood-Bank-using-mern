const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const bloodRoutes = require("./routes/bloodRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const inventoryRoutes = require("./routes/inventory");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/bloodbank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use("/api/blood", bloodRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api", inventoryRoutes); 
const Enquiry = require("./models/Enquiry");
const Record = require("./models/Record");
app.use('/api/bloodbankinfo', bloodRoutes); 

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Blood Bank API");
});

// Records Routes
app.get("/api/records", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    console.error("❌ Error fetching records:", err);
    res.status(500).json({ message: "Server error fetching records" });
  }
});

app.post("/api/records", async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).json({ message: "✅ Record saved successfully" });
  } catch (err) {
    console.error("❌ Error saving record:", err);
    res.status(500).json({ message: "Server error saving record" });
  }
});

// Enquiry Routes
app.post("/api/enquiry", async (req, res) => {
  try {
    const { type } = req.body;

    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();

    if (type === "donor") {
      console.log("🩸 New Donor Registered:", req.body.name);
    } else if (type === "request") {
      console.log("📦 New Blood Request from:", req.body.hospital);
    }

    res.status(201).json({ message: "✅ Enquiry received and saved!" });
  } catch (err) {
    console.error("❌ Error saving enquiry:", err);
    res.status(500).json({ message: "Server error saving enquiry" });
  }
});

app.get("/api/enquiry", async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error("❌ Error fetching enquiries:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Blood Bank API running at http://localhost:${PORT}`);
});
