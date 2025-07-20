import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

const Home = () => {
  const [inventory, setInventory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/enquiry"); // or 192.168.29.11
      const data = await res.json();
      computeInventory(data);
    } catch (err) {
      console.error("Failed to fetch enquiry data", err);
      setInventory({});
    }
  };

  const computeInventory = (data) => {
    const inventoryMap = {};

    data.forEach((entry) => {
      const { bloodGroup, type, units } = entry;
      if (!bloodGroup || !units || units <= 0) return;

      const group = bloodGroup.toUpperCase();
      if (!inventoryMap[group]) inventoryMap[group] = 0;

      if (type === "donor") {
        inventoryMap[group] += units;
      } else if (type === "request") {
        inventoryMap[group] -= units;
      }
    });

    // Remove negatives
    Object.keys(inventoryMap).forEach((key) => {
      if (inventoryMap[key] < 0) inventoryMap[key] = 0;
    });

    setInventory(inventoryMap);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="home-container">
      {/* ✅ HERO SECTION */}
      <div className="hero">
        <h1>Save Lives, Donate Blood</h1>
        <p>Your donation can be the bridge between life and death for someone in need</p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/enquiry")}>Request Blood</button>
          <button onClick={() => navigate("/enquiry?type=donor")} className="donor-btn">
            Become a Donor
          </button>
        </div>
      </div>

      {/* 🩸 INVENTORY SECTION */}
      <h2>🩸 Current Blood Available</h2>
      <p>Real-time blood inventory status</p>
      <div className="inventory-grid">
        {bloodGroups.map((group) => {
          const units = inventory[group] || 0;
          const isAvailable = units > 0;
          return (
            <div key={group} className={`inventory-card ${isAvailable ? "available" : "unavailable"}`}>
              <h3>{group}</h3>
              <p>Status: {isAvailable ? "✅ Available" : "❌ Not Available"}</p>
              <p>Units: {units}</p>
            </div>
          );
        })}
      </div>

      {/* 🧰 SERVICES SECTION */}
      <div className="services-section">
        <h2>🛠️ Our Services</h2>
        <p>Comprehensive blood banking solutions</p>
        <div className="services-grid">
          <div className="service-card">
            <h3>🩸 Blood Collection</h3>
            <p>Safe and hygienic blood collection from certified donors</p>
          </div>
          <div className="service-card">
            <h3>🚨 Emergency Supply</h3>
            <p>24/7 emergency blood supply for critical situations</p>
          </div>
          <div className="service-card">
            <h3>👥 Donor Management</h3>
            <p>Comprehensive donor registration and health screening</p>
          </div>
          <div className="service-card">
            <h3>🏥 Hospital Network</h3>
            <p>Connected with 50+ hospitals for seamless blood supply</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;