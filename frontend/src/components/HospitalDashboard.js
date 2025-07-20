import React, { useEffect, useState } from 'react';
import './BloodBankDashboard.css';

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [inventory, setInventory] = useState({});
  const [totalUnits, setTotalUnits] = useState(0);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/enquiry');
      const data = await res.json();
      setEnquiries(data);
      computeInventory(data);
    } catch (error) {
      console.error('Error fetching enquiries', error);
    }
  };

  const computeInventory = (data) => {
    const inventoryMap = {};

    // Calculate units for each blood group
    data.forEach((entry) => {
      const { bloodGroup, type, units } = entry;
      if (!bloodGroup || !units || units <= 0) return;

      const group = bloodGroup.toUpperCase();
      if (!inventoryMap[group]) inventoryMap[group] = 0;

      if (type === 'donor') {
        inventoryMap[group] += units;
      } else if (type === 'request') {
        inventoryMap[group] -= units;
      }
    });

    // Filter out negative values (can't have negative units)
    Object.keys(inventoryMap).forEach((key) => {
      if (inventoryMap[key] < 0) inventoryMap[key] = 0;
    });

    setInventory(inventoryMap);

    const total = Object.values(inventoryMap).reduce((acc, val) => acc + val, 0);
    setTotalUnits(total);
  };

  return (
    <div className="dashboard-container">
      <h1>Hospital Dashboard</h1>
      <p>Live Inventory Status</p>

      <div className="stats">
        <div className="card">Total Units:<br /><strong>{totalUnits}</strong></div>
        <div className="card">Available Blood Type Count:<br /><strong>{enquiries.filter(e => e.type === 'donor').length}</strong></div>
      </div>

      <h2>Blood Inventory</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(inventory).length === 0 ? (
            <tr><td colSpan="2">No data</td></tr>
          ) : (
            Object.entries(inventory).map(([group, units]) => (
              <tr key={group}>
                <td>{group}</td>
                <td>{units}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Recent Blood Requests & Donations</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Hospital</th>
            <th>Type</th>
            <th>Blood Group</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length === 0 ? (
            <tr><td colSpan="7">No recent requests or donations</td></tr>
          ) : (
            enquiries.slice(-10).reverse().map((req) => (
              <tr key={req._id}>
                <td>{req._id.slice(-6)}</td>
                <td>{req.name}</td>
                <td>{req.phone}</td>
                <td>{req.hospitalName || '--'}</td>
                <td>{req.type}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.units}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Quick Actions</h2>
      <div className="actions">
        <button onClick={() => window.location.href = '/enquiry'}>Register Donor</button>
        <button onClick={() => window.location.href = '/enquiry'}>Request Blood</button>
      </div>
    </div>
  );
}
