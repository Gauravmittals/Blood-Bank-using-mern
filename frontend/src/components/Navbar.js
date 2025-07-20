// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <h1>Blood Bank</h1>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/gallery">Gallery</Link>
//         <Link to="/contact">Contact</Link>
//         
//         <Link to="/dashboard">Dashboard</Link>
//       </div>
//     </nav>
//   );
// }
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">LifeBlood</h2>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/contact">Contact</a></li>
        <li ><a href="/enquiry">Enquiry</a></li>

        <li className="dropdown">
        <button className="dropdown-button">Dashboard ▾</button>

          <ul className="dropdown-menu">
            <li><a href="/BloodBankDashBoard">Blood Bank Org</a></li>
            <li><a href="/HospitalDashBoard">Hospital</a></li>
            <li><a href="/DoctorDashBoard">Doctor</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

