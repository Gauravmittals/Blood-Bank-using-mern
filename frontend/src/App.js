import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BloodBankDashboard from './components/BloodBankDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import EnquiryForm from "./pages/EnquiryForm";

import Footer from "./components/Footer";

function App() {
  return (
    <Router className="app-wrapper">
      <Navbar />
      <Routes className="main-content">
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        
        <Route path="/BloodBankDashboard" element={<BloodBankDashboard />} />
        <Route path="/HospitalDashboard" element={<HospitalDashboard />} />
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
      </Routes>
      <Footer/>
    </Router>



  );
}

export default App;
