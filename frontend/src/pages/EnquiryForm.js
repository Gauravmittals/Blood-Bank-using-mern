import React, { useState } from "react";
import "../components/EnquiryForm.css"; // Keep using your existing CSS

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    type: "", // "request" or "donor"
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    hospital: "",
    units: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      type: "",
      name: "",
      email: "",
      phone: "",
      bloodGroup: "",
      hospital: "",
      units: "",
      message: "",
    });
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5050/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setStatus("✅ Enquiry submitted successfully!");
        handleReset();
      })
      .catch((err) => {
        console.error(err);
        setStatus("❌ Failed to submit enquiry.");
      });
  };

  return (
    <div className="enquiry-form-container">
      <h2>{formData.type === "donor" ? "Become a Donor" : "Blood Enquiry Form"}</h2>
      <p>Submit your blood {formData.type === "donor" ? "donation" : "requirement"} information</p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Information</legend>

          <label>Full Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Phone Number *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Email Address</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <legend>Blood Details</legend>

          <label>Blood Group *</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select blood group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
          </select>

          <label>Request Type *</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="request">Request Blood</option>
            <option value="donor">Donate Blood</option>
          </select>

          <label>Units *</label>
  <input
    name="units"
    type="number"
    value={formData.units}
    onChange={handleChange}
    required
  />

        </fieldset>

        <fieldset>
          <legend>Hospital Details</legend>
          <label>Hospital Name *</label>
          <input name="hospital" value={formData.hospital} onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Additional Information</legend>
          <label>Message / Medical Info</label>
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </fieldset>

        <div className="form-buttons">
          <button type="submit">Submit Enquiry</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
        {status && <p style={{ marginTop: "10px", color: "green" }}>{status}</p>}
      </form>
    </div>
  );
};

export default EnquiryForm;
