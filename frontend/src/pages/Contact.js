import React, { useState } from "react";
import "../components/ContactUs.css";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://192.168.29.11:5050/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: ""
        });
      })
      .catch((err) => {
        alert("Failed to send message.");
        console.error(err);
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Get in touch with us for any blood-related emergencies or inquiries</p>

      <div className="contact-details">
        <div>
          <h3>📞 Emergency Contact</h3>
          <p><strong>Hotline:</strong> +1 (555) 911-BLOOD</p>
          <p><strong>Email:</strong> emergency@bloodbank.org</p>
        </div>
        <div>
          <h3>🏥 Location & Hours</h3>
          <p><strong>Main Branch:</strong><br />123 Medical Center Drive<br />Healthcare City, HC 12345</p>
          <p><strong>Operating Hours:</strong><br />24/7 Emergency Service<br />Regular: 8 AM - 6 PM</p>
        </div>
      </div>

      
    </div>
  );
};

export default ContactUs;
