import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Emergency Section */}
        <div className="footer-section emergency">
          <h3>🚨 Emergency Blood Request</h3>
          <p>In case of emergency, contact us immediately for urgent blood requirements</p>
          <p className="emergency-phone">📞 +1 (555) 911-BLOOD</p>
          <p>⏱️ 24/7 Available</p>
        </div>

        {/* About */}
        <div className="footer-section about">
          <h3>🩸 LifeBlood Bank</h3>
          <p>Committed to saving lives through safe and reliable blood banking services.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>🔗 Quick Links</h3>
          <ul>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/enquiry">Blood Request</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>📍 Contact Info</h3>
          <p>123 Medical Center Drive</p>
          <p>📞 +1 (555) 911-BLOOD</p>
          <p>🎓 Licensed & Certified</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 LifeBlood Bank. All rights reserved. Saving lives, one donation at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
